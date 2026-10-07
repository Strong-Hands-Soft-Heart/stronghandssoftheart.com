// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.stronghandssoftheart.com',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap()],
});
