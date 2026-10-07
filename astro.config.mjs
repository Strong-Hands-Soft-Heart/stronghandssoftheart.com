// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { indexNow } from './src/utils/indexNow';

export default defineConfig({
  site: 'https://www.stronghandssoftheart.com',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap(), indexNow()],
});
