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
