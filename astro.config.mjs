import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://coolify.io",
  trailingSlash: "never",
  build: {
    format: "file",
  },
  server: {
    host: '0.0.0.0'
  },
  integrations: [tailwind(), svelte(), sitemap()]
});
