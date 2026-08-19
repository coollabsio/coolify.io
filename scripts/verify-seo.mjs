import { readFileSync, existsSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  SITE_ORIGIN,
  REDIRECT_PATHS,
  canonicalize,
  isRedirectPath,
} from "../src/lib/seo.js";

const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

assert(canonicalize("/") === SITE_ORIGIN, `homepage canonical should be ${SITE_ORIGIN}`);
assert(canonicalize("/pricing/") === `${SITE_ORIGIN}/pricing`, "strip trailing slash");
assert(canonicalize("/pricing.html") === `${SITE_ORIGIN}/pricing`, "strip .html");
assert(
  canonicalize("https://coolify.io/cloud/") === `${SITE_ORIGIN}/cloud`,
  "normalize absolute URL",
);
assert(canonicalize("http://www.coolify.io/cloud/") === `${SITE_ORIGIN}/cloud`, "force https apex");
assert(isRedirectPath("/github/") === true, "github is a redirect path");
assert(isRedirectPath("/pricing") === false, "pricing is not a redirect path");

const distDir = join(import.meta.dirname, "..", "dist");
if (existsSync(distDir)) {
  const marketingPages = [
    "index.html",
    "pricing.html",
    "cloud.html",
    "self-hosted.html",
    "changelog.html",
    "philosophy.html",
    "services.html",
    "sponsorships.html",
    "contributors.html",
    "privacy-policy.html",
  ];

  for (const file of marketingPages) {
    const html = readFileSync(join(distDir, file), "utf8");
    const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
    const expected = canonicalize(file === "index.html" ? "/" : `/${file}`);
    assert(canonical === expected, `${file} canonical is ${canonical}, expected ${expected}`);
    assert(!canonical?.endsWith("/") || canonical === `${SITE_ORIGIN}/`, `${file} has trailing-slash canonical`);
  }

  const sitemap = readFileSync(join(distDir, "sitemap-0.xml"), "utf8");
  for (const path of REDIRECT_PATHS) {
    assert(!sitemap.includes(`${SITE_ORIGIN}${path}`), `sitemap still lists ${path}`);
  }
  assert(sitemap.includes(`<loc>${SITE_ORIGIN}</loc>`), "sitemap includes homepage without slash");
  assert(sitemap.includes(`<loc>${SITE_ORIGIN}/pricing</loc>`), "sitemap includes /pricing");

  for (const path of REDIRECT_PATHS) {
    const stub = join(distDir, `${path.slice(1)}.html`);
    assert(!existsSync(stub), `stub page still built: ${stub}`);
  }

  assert(existsSync(join(distDir, "safari-pinned-tab.svg")), "safari-pinned-tab.svg missing from dist");
  assert(existsSync(join(distDir, "404.html")), "404.html missing from dist");

  const unknownSoft200 = readdirSync(distDir).includes("blog.html");
  assert(!unknownSoft200, "unexpected blog.html in dist");
}

if (failures.length) {
  console.error("SEO checks failed:");
  for (const failure of failures) console.error(` - ${failure}`);
  process.exit(1);
}

console.log(existsSync(distDir) ? "SEO checks passed (including dist)." : "SEO helper checks passed.");
