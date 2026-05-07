#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const ORG = 'coollabsio';
const ENDPOINT = 'https://api.github.com/graphql';
const OC_SLUG = 'coollabsio';
const OC_ENDPOINT = 'https://api.opencollective.com/graphql/v2';

// Rough FX for non-USD donations. Updated occasionally; bucketing is forgiving.
const FX_TO_USD = { USD: 1, EUR: 1.07, GBP: 1.27 };

const QUERY = `
  query($org: String!, $cursor: String) {
    organization(login: $org) {
      sponsorshipsAsMaintainer(first: 100, after: $cursor, activeOnly: true, includePrivate: false) {
        totalCount
        pageInfo { hasNextPage endCursor }
        nodes {
          createdAt
          isOneTimePayment
          privacyLevel
          tier { monthlyPriceInDollars name }
          sponsorEntity {
            __typename
            ... on User { login name avatarUrl websiteUrl }
            ... on Organization { login name avatarUrl websiteUrl }
          }
        }
      }
    }
  }
`;

function bucket(price) {
  if (price >= 500) return 'huge';
  if (price >= 200) return 'big';
  if (price >= 40) return 'small';
  return null;
}

const SPONSOR_FILES = [
  'src/components/HugeSponsors.svelte',
  'src/components/BigSponsors.svelte',
  'src/components/SmallSponsors.svelte',
];

function rootHost(host) {
  if (!host) return null;
  return host.replace(/^www\./i, '').toLowerCase();
}

function hostFromUrl(u) {
  if (!u) return null;
  const withProtocol = /^https?:\/\//i.test(u) ? u : `https://${u}`;
  try {
    return rootHost(new URL(withProtocol).hostname);
  } catch {
    return null;
  }
}

function collectKnownTokens() {
  const logins = new Set();
  const hosts = new Set();
  const tokens = new Set();
  const offPlatform = new Set();
  const expiredOffPlatform = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const loginRe = /github\.com\/([\w-]+)(?=\.png|\/|"|'|\?|$)/gi;
  const ocRe = /opencollective\.com\/([\w-]+)(?=\/|"|'|\?|$)/gi;
  const urlRe = /https?:\/\/[\w./%&=?\-_+#:]+/gi;
  const imageKeyRe = /imageKey:\s*["']([^"']+)["']/gi;
  const imageUrlRe = /imageUrl:\s*["']\/images\/([^"']+)["']/gi;
  const aliasRe = /\/\/\s*(?:gh|oc):\s*([\w,\s-]+)/gi;
  const offPlatformRe = /\/\/\s*off-platform:\s*([^\n\r]+)/gi;

  const RESERVED_PATHS = new Set(['sponsors', 'orgs', 'apps']);

  for (const file of SPONSOR_FILES) {
    const full = path.join(process.cwd(), file);
    if (!fs.existsSync(full)) continue;
    const raw = fs.readFileSync(full, 'utf8');

    // Strip commented-out content (line comments + block comments)
    // so cancelled/disabled sponsors don't pollute the known-set.
    const aliasMatchesBeforeStrip = [...raw.matchAll(aliasRe)];
    const src = raw
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/^[ \t]*\/\/.*$/gm, '');

    for (const m of src.matchAll(loginRe)) {
      const login = m[1].toLowerCase();
      if (RESERVED_PATHS.has(login)) continue;
      logins.add(login);
    }
    for (const m of src.matchAll(ocRe)) {
      logins.add(m[1].toLowerCase());
    }
    for (const m of src.matchAll(urlRe)) {
      const h = hostFromUrl(m[0]);
      if (h && h !== 'github.com') hosts.add(h);
    }
    for (const re of [imageKeyRe, imageUrlRe]) {
      for (const m of src.matchAll(re)) {
        const base = m[1].split('/').pop().replace(/\.[a-z0-9]+$/i, '').toLowerCase();
        const head = base.split(/[-_]/)[0];
        if (head && head.length > 2) tokens.add(head);
      }
    }
    // Aliases come from comments — re-scan original source
    for (const m of aliasMatchesBeforeStrip) {
      for (const alias of m[1].split(',')) {
        const a = alias.trim().toLowerCase();
        if (a) logins.add(a);
      }
    }
    for (const m of raw.matchAll(offPlatformRe)) {
      const line = m[1].trim();
      const untilMatch = line.match(/\s+until\s+(\d{4}-\d{2}-\d{2})\s*$/i);
      const expiry = untilMatch ? new Date(untilMatch[1]) : null;
      const loginsPart = untilMatch ? line.slice(0, untilMatch.index) : line;
      const expired = expiry && expiry < today;
      for (const alias of loginsPart.split(',')) {
        const a = alias.trim().toLowerCase();
        if (!a) continue;
        if (expired) {
          expiredOffPlatform.push({ login: a, expiredOn: untilMatch[1] });
        } else {
          offPlatform.add(a);
          logins.add(a);
        }
      }
    }
  }
  return { logins, hosts, tokens, offPlatform, expiredOffPlatform };
}

async function fetchOpenCollective() {
  const query = `
    query($slug: String!, $offset: Int!) {
      account(slug: $slug) {
        members(role: BACKER, limit: 100, offset: $offset) {
          totalCount
          nodes {
            role
            tier { name amount { value currency } interval }
            account {
              type
              slug
              name
              imageUrl
              website
              socialLinks { type url }
            }
            totalDonations { value currency }
          }
        }
      }
    }
  `;
  const all = [];
  let offset = 0;
  let total = 0;

  while (true) {
    console.log(`Fetching Open Collective offset ${offset}...`);
    const res = await fetch(OC_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { slug: OC_SLUG, offset } }),
    });
    if (!res.ok) {
      throw new Error(`OC HTTP ${res.status}: ${res.statusText}`);
    }
    const json = await res.json();
    if (json.errors) {
      throw new Error(`OC GraphQL errors: ${JSON.stringify(json.errors)}`);
    }
    const conn = json.data?.account?.members;
    if (!conn) throw new Error('OC: unexpected response shape');
    if (offset === 0) {
      total = conn.totalCount;
      console.log(`Total Open Collective backers: ${total}`);
    }
    all.push(...conn.nodes);
    offset += conn.nodes.length;
    if (conn.nodes.length === 0 || all.length >= total) break;
    await new Promise((r) => setTimeout(r, 100));
  }

  return all;
}

function transformOpenCollective(nodes, known) {
  const { logins, hosts, tokens } = known;
  const result = { huge: [], big: [], small: [] };
  let skippedKnown = 0;

  for (const node of nodes) {
    const tier = node.tier;
    if (!tier || tier.interval !== 'month') continue; // monthly only
    const amount = tier.amount?.value ?? 0;
    const fx = FX_TO_USD[tier.amount?.currency] ?? 1;
    const usd = Math.round(amount * fx);
    const tierKey = bucket(usd);
    if (!tierKey) continue;

    const acc = node.account;
    if (!acc) continue;
    if (acc.slug?.startsWith('guest-') || acc.slug?.startsWith('user-')) continue; // skip anonymous

    const slugLower = acc.slug.toLowerCase();
    const slugSegments = slugLower.split(/[-_]/).filter((s) => s.length > 2);
    const sponsorHost = hostFromUrl(acc.website);
    const isKnown = logins.has(slugLower)
      || (sponsorHost && hosts.has(sponsorHost))
      || tokens.has(slugLower)
      || slugSegments.some((seg) => tokens.has(seg));
    if (isKnown) {
      skippedKnown++;
      continue;
    }

    result[tierKey].push({
      source: 'opencollective',
      slug: acc.slug,
      name: acc.name || acc.slug,
      avatarUrl: acc.imageUrl,
      websiteUrl: acc.website || null,
      monthlyPriceInDollars: usd,
      monthlyPriceOriginal: { value: amount, currency: tier.amount?.currency },
      type: acc.type,
    });
  }

  return { ...result, skippedKnown };
}

async function fetchSponsors(token) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    'User-Agent': 'coolify.io-fetch-sponsors',
  };

  const all = [];
  let cursor = null;
  let page = 1;

  while (true) {
    console.log(`Fetching sponsors page ${page}...`);
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query: QUERY, variables: { org: ORG, cursor } }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`HTTP ${res.status}: ${res.statusText} — ${body}`);
    }

    const json = await res.json();

    if (json.errors) {
      const tierForbidden = json.errors.some(
        (e) => e.type === 'FORBIDDEN' && e.path?.includes('tier'),
      );
      if (tierForbidden) {
        console.error('❌ tier subfield FORBIDDEN — fine-grained PATs cannot read Sponsorship.tier.');
        console.error('   Use a classic PAT with scopes: admin:org, read:user, public_repo');
        console.error('   Generate at: https://github.com/settings/tokens');
        process.exit(1);
      }
      throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
    }

    const conn = json.data?.organization?.sponsorshipsAsMaintainer;
    if (!conn) {
      throw new Error('Unexpected response shape (no sponsorshipsAsMaintainer)');
    }

    if (page === 1) {
      console.log(`Total active public sponsors: ${conn.totalCount}`);
    }

    all.push(...conn.nodes);

    if (!conn.pageInfo.hasNextPage) break;
    cursor = conn.pageInfo.endCursor;
    page++;
    await new Promise((r) => setTimeout(r, 100));
  }

  return all;
}

function transform(nodes, known) {
  const { logins, hosts, tokens } = known;
  const result = { huge: [], big: [], small: [] };
  let skippedKnown = 0;

  for (const node of nodes) {
    if (node.isOneTimePayment) continue;
    if (node.privacyLevel !== 'PUBLIC') continue;

    const price = node.tier?.monthlyPriceInDollars ?? 0;
    const tier = bucket(price);
    if (!tier) continue;

    const e = node.sponsorEntity;
    if (!e) continue;

    const loginLower = e.login.toLowerCase();
    const loginSegments = loginLower.split(/[-_]/).filter((s) => s.length > 2);
    const sponsorHost = hostFromUrl(e.websiteUrl);
    const known = logins.has(loginLower)
      || (sponsorHost && hosts.has(sponsorHost))
      || tokens.has(loginLower)
      || loginSegments.some((seg) => tokens.has(seg));
    if (known) {
      skippedKnown++;
      continue;
    }

    result[tier].push({
      source: 'github',
      login: e.login,
      name: e.name || e.login,
      avatarUrl: e.avatarUrl,
      websiteUrl: e.websiteUrl || null,
      monthlyPriceInDollars: price,
      type: e.__typename,
    });
  }

  for (const tier of ['huge', 'big', 'small']) {
    result[tier].sort((a, b) => b.monthlyPriceInDollars - a.monthlyPriceInDollars);
  }

  return { ...result, skippedKnown };
}

async function main() {
  const token = process.env.GITHUB_TOKEN_SPONSORS;
  if (!token) {
    console.error('❌ GITHUB_TOKEN_SPONSORS required for Sponsors GraphQL API.');
    console.error('   Classic PAT with scopes: admin:org, read:user, public_repo');
    console.error('   Generate at: https://github.com/settings/tokens');
    process.exit(1);
  }

  try {
    const known = collectKnownTokens();
    console.log(`Known on landing page: ${known.logins.size} logins/slugs, ${known.hosts.size} hosts, ${known.tokens.size} filename tokens`);

    const ghNodes = await fetchSponsors(token);
    const { skippedKnown: ghSkipped, ...ghBuckets } = transform(ghNodes, known);

    const ocNodes = await fetchOpenCollective();
    const { skippedKnown: ocSkipped, ...ocBuckets } = transformOpenCollective(ocNodes, known);

    const buckets = { huge: [], big: [], small: [] };
    for (const tier of ['huge', 'big', 'small']) {
      buckets[tier] = [...ghBuckets[tier], ...ocBuckets[tier]].sort(
        (a, b) => b.monthlyPriceInDollars - a.monthlyPriceInDollars,
      );
    }

    const activeLogins = new Set([
      ...ghNodes.map((n) => n.sponsorEntity?.login?.toLowerCase()).filter(Boolean),
      ...ocNodes.map((n) => n.account?.slug?.toLowerCase()).filter(Boolean),
    ]);
    const staleSponsors = [...known.logins]
      .filter((l) => !activeLogins.has(l) && !known.offPlatform.has(l))
      .sort();

    const skippedKnown = ghSkipped + ocSkipped;
    const output = {
      lastUpdated: new Date().toISOString(),
      sources: { github: ORG, opencollective: OC_SLUG },
      note: 'Diff only — sponsors already on the landing page are excluded. Sources: GitHub Sponsors + Open Collective. staleSponsors lists landing-page identifiers NOT in either active set. expiredOffPlatform lists off-platform sponsors whose contract end date has passed.',
      knownLoginsCount: known.logins.size,
      knownHostsCount: known.hosts.size,
      knownTokensCount: known.tokens.size,
      skippedKnownCount: skippedKnown,
      expiredOffPlatform: known.expiredOffPlatform,
      staleSponsors,
      ...buckets,
    };

    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const outPath = path.join(publicDir, 'sponsors.json');
    fs.writeFileSync(outPath, JSON.stringify(output, null, 2));

    console.log('\n✅ Sponsors diff saved to public/sponsors.json');
    console.log(`   GitHub skipped: ${ghSkipped}, Open Collective skipped: ${ocSkipped}`);
    console.log(`💎 Huge ($500+/m) missing: ${buckets.huge.length}`);
    console.log(`🔷 Big ($200-499/m) missing: ${buckets.big.length}`);
    console.log(`🔹 Small ($40-199/m) missing: ${buckets.small.length}`);
    if (staleSponsors.length > 0) {
      console.log(`\n⚠ Possibly stale (on landing page but NOT in active GitHub sponsors): ${staleSponsors.length}`);
      for (const l of staleSponsors) console.log(`   - ${l}`);
    }
    if (known.expiredOffPlatform.length > 0) {
      console.log(`\n🔴 Expired off-platform sponsorships: ${known.expiredOffPlatform.length}`);
      for (const e of known.expiredOffPlatform) console.log(`   - ${e.login} (ended ${e.expiredOn})`);
    }
  } catch (error) {
    console.error('❌ Failed to fetch sponsors:', error.message);
    process.exit(1);
  }
}

main();
