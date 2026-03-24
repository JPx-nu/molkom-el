// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://jpx-nu.github.io',
  base: '/molkom-el',
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
