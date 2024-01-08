import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  server: {
    host: '0.0.0.0'
  },
  integrations: [tailwind(), svelte()]
});