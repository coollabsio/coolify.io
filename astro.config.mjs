import { defineConfig } from 'astro/config';
import svelte, { vitePreprocess } from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://coolify.io",
  trailingSlash: "never",
  build: {
    format: "file",
  },
  // Redirects. nginx.conf answers these with real HTTP redirects in production;
  // this map keeps them working in `astro dev` and `astro preview`.
  // A string target is a 301. nginx uses 302 for the external short links.
  redirects: {
    "/discord": "https://coollabs.io/discord",
    "/github": "https://github.com/coollabsio/coolify",
    "/live": "https://twitch.tv/heyandras",
    "/hetzner": "https://coolify.io/docs/hetzner",
    "/digitalocean": "https://m.do.co/c/61b0bcb701ab",
    "/vultr": "https://www.vultr.com/?ref=9911335",
    "/hidden": "https://www.youtube.com/watch?v=GFq6wH5JR2A",
    "/philosophy": "https://coollabs.io/philosophy",
    "/compare": "/compare/coolify-vs-dokploy-vs-caprover-vs-dokku-vs-kamal",
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: ['.ts.net'],
  },
  integrations: [
    svelte({ preprocess: vitePreprocess() }),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
