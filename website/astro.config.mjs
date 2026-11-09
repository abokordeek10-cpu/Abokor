import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Statische Website: `npm run build` erzeugt den fertigen Ordner `dist/`.
export default defineConfig({
  site: 'https://abora-automation.de',
  trailingSlash: 'never',
  build: {
    // /leistungen -> leistungen.html (sauber für Caddy/Nginx mit try_files)
    format: 'file',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/demo'),
    }),
  ],
});
