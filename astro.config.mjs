// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://molkom-el.se', // placeholder — update before launch
  output: 'static',
  integrations: [sitemap()],
  image: {
    domains: [],
  },
  vite: {
    css: {
      preprocessorOptions: {},
    },
  },
});
