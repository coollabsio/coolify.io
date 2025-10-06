import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";

const { SITE_URL } = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');

// https://astro.build/config
export default defineConfig({
  site: SITE_URL || "https://coolify.io",
  vite: {
    optimizeDeps: {
      include: ['lodash.get', 'lodash.isequal', 'lodash.clonedeep']
    }
  },
  server: {
    host: '0.0.0.0'
  },
  integrations: [tailwind(), svelte(), sitemap()]
});