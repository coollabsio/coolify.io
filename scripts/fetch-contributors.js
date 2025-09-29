#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const repos = [
  { name: 'coolify', repo: 'coollabsio/coolify' },
  { name: 'docs', repo: 'coollabsio/coolify-docs' }
];

function isBot(user) {
  return user.type === 'Bot' || /\[bot\]$/i.test(user.login);
}

async function fetchAllContributors(repo) {
  const contributors = [];
  let page = 1;
  const perPage = 100; // GitHub API max per page

  console.log(`Fetching contributors for ${repo}...`);

  while (true) {
    try {
      const url = `https://api.github.com/repos/${repo}/contributors?per_page=${perPage}&page=${page}&anon=true`;
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 403) {
          console.error(`Rate limited while fetching ${repo} (page ${page})`);
          throw new Error('GitHub API rate limit exceeded');
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      // If no contributors returned, we've reached the end
      if (!data || data.length === 0) {
        break;
      }

      // Filter out bots and process contributors
      const validContributors = data.filter(user => {
        // Handle anonymous contributors (they have 'name' instead of 'login')
        if (user.type === 'Anonymous') {
          return true; // Include anonymous contributors
        }
        // For regular users, check for login and filter out bots
        return user.login && !isBot(user);
      });
      contributors.push(...validContributors);

      console.log(`Fetched page ${page} for ${repo}: ${data.length} contributors (${validContributors.length} valid)`);

      // If we got less than perPage, we've reached the end
      if (data.length < perPage) {
        break;
      }

      page++;

      // Small delay to be nice to GitHub API
      await new Promise(resolve => setTimeout(resolve, 100));

    } catch (error) {
      console.error(`Error fetching page ${page} for ${repo}:`, error.message);

      // Retry logic for transient errors
      if (page === 1) {
        // If first page fails, throw error
        throw error;
      } else {
        // If later page fails, just break (we got some data)
        console.log(`Stopping at page ${page} due to error`);
        break;
      }
    }
  }

  // Sort by contributions descending
  contributors.sort((a, b) => b.contributions - a.contributions);

  console.log(`Total contributors for ${repo}: ${contributors.length}`);
  return contributors;
}

async function main() {
  const result = {
    lastUpdated: new Date().toISOString()
  };

  try {
    for (const { name, repo } of repos) {
      const contributors = await fetchAllContributors(repo);
      result[name] = contributors.map(c => {
        // Handle anonymous contributors
        if (c.type === 'Anonymous') {
          return {
            login: 'Anonymous',
            avatar_url: '/android-launchericon-144-144.png', // Use Coolify logo for anonymous contributors
            html_url: null, // Anonymous contributors don't have profile links
            contributions: c.contributions
          };
        }
        // Regular contributors
        return {
          login: c.login,
          avatar_url: c.avatar_url,
          html_url: c.html_url,
          contributions: c.contributions
        };
      });
    }

    // Ensure public directory exists
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Write contributors data to public directory
    const outputPath = path.join(publicDir, 'contributors.json');
    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));

    console.log('\n✅ Contributors data saved to public/contributors.json');
    console.log(`📊 Coolify contributors: ${result.coolify.length}`);
    console.log(`📚 Docs contributors: ${result.docs.length}`);

  } catch (error) {
    console.error('❌ Failed to fetch contributors:', error.message);
    process.exit(1);
  }
}

main();