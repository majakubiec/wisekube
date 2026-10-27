// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import path from 'node:path';

/**
 * In dev, serve public/<dir>/index.html at /<dir>/ like Cloudflare does in production
 * (used by lab experiments).
 * @returns {import('astro').AstroIntegration}
 */
function publicDirIndex() {
  return {
    name: 'public-dir-index',
    hooks: {
      'astro:server:setup': ({ server }) => {
        server.middlewares.use((req, _res, next) => {
          const [pathname, query] = (req.url ?? '').split('?');
          if (pathname && !path.extname(pathname)) {
            const dir = decodeURIComponent(pathname).replace(/\/?$/, '/');
            if (fs.existsSync(path.join(process.cwd(), 'public', dir, 'index.html'))) {
              req.url = `${dir}index.html${query ? `?${query}` : ''}`;
            }
          }
          next();
        });
      },
    },
  };
}

const SITE = 'https://blog.wisekube.com';

/** Lab experiments live in public/, so list them for the sitemap. */
function labPages() {
  const dir = path.join(process.cwd(), 'public', 'lab');
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !/^[._]/.test(e.name) && fs.existsSync(path.join(dir, e.name, 'index.html')))
    .map((e) => `${SITE}/lab/${encodeURIComponent(e.name)}/`);
}

// https://astro.build/config
export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [mdx(), sitemap({ customPages: labPages() }), publicDirIndex()]
});
