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
  // Short links. nginx.conf answers these with real HTTP redirects in production;
  // this map keeps them working in `astro dev` and `astro preview`.
  redirects: {
    "/discord": "https://coollabs.io/discord",
    "/github": "https://github.com/coollabsio/coolify",
    "/live": "https://twitch.tv/heyandras",
    "/hetzner": "https://coolify.io/docs/hetzner",
    "/digitalocean": "https://m.do.co/c/61b0bcb701ab",
    "/vultr": "https://www.vultr.com/?ref=9911335",
    "/hidden": "https://www.youtube.com/watch?v=GFq6wH5JR2A",
    "/philosophy": "https://coollabs.io/philosophy",
  },
  server: {
    host: '0.0.0.0'
  },
  integrations: [
    svelte({ preprocess: vitePreprocess() }),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
