import fs from 'node:fs';
import path from 'node:path';

export interface LabItem {
  slug: string;
  href: string;
  title: string;
  description?: string;
  cover?: string;
  date: Date;
}

const LAB_DIR = path.join(process.cwd(), 'public', 'lab');
const COVER_NAMES = ['cover.webp', 'cover.png', 'cover.jpg', 'cover.jpeg', 'cover.avif'];

function decode(text: string) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function readMeta(html: string, name: string) {
  const tag = html.match(new RegExp(`<meta[^>]+name=["']${name}["'][^>]*>`, 'i'))?.[0];
  const content = tag?.match(/content=["']([^"']*)["']/i)?.[1];
  return content ? decode(content) : undefined;
}

/**
 * Every public/lab/<slug>/index.html becomes a gallery item.
 * Title and description come from the page's <title> and <meta name="description">;
 * an optional <meta name="date" content="YYYY-MM-DD"> controls ordering (else file mtime).
 */
export function getLabItems(): LabItem[] {
  if (!fs.existsSync(LAB_DIR)) return [];

  return fs
    .readdirSync(LAB_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.') && !entry.name.startsWith('_'))
    .flatMap((entry) => {
      const dir = path.join(LAB_DIR, entry.name);
      const indexPath = path.join(dir, 'index.html');
      if (!fs.existsSync(indexPath)) return [];

      const html = fs.readFileSync(indexPath, 'utf8');
      const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
      const metaDate = readMeta(html, 'date');
      const parsedDate = metaDate ? new Date(metaDate) : undefined;
      const cover = COVER_NAMES.find((name) => fs.existsSync(path.join(dir, name)));
      const href = `/lab/${encodeURIComponent(entry.name)}/`;

      return [
        {
          slug: entry.name,
          href,
          title: title ? decode(title) : entry.name,
          description: readMeta(html, 'description'),
          cover: cover ? href + cover : undefined,
          date: parsedDate && !isNaN(parsedDate.valueOf()) ? parsedDate : fs.statSync(indexPath).mtime,
        },
      ];
    })
    .sort((a, b) => b.date.valueOf() - a.date.valueOf());
}
