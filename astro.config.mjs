import { defineConfig } from 'astro/config';
import svelte, { vitePreprocess } from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { canonicalize, isRedirectPath } from "./src/lib/seo.js";

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
    sitemap({
      filter: (page) => !isRedirectPath(page),
      serialize(item) {
        item.url = canonicalize(item.url);
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
