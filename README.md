# Wisekube

A kube: a cube with a k. Six walls and a space to challenge and create. Tech, code and everything in between.

Live at [blog.wisekube.com](https://blog.wisekube.com). Built with [Astro](https://astro.build) and Tailwind CSS, deployed to Cloudflare on every push to `main`.

## Commands

| Command           | What it does                                   |
| :---------------- | :--------------------------------------------- |
| `npm install`     | Install dependencies                           |
| `npm run dev`     | Start the dev server at `localhost:4321`       |
| `npm run build`   | Build the site into `dist/`                    |
| `npm run preview` | Preview the built site                         |
| `npm run deploy`  | Build and deploy with Wrangler (manual deploy) |

## Writing a blog post

Add a `.md` or `.mdx` file to `src/content/blog/`:

```md
---
title: My post
description: One sentence shown on cards and in link previews.
pubDate: 2026-10-27
category: Notes
image: /og-default.png   # optional
featured: true           # optional, pins it as the big card on /blog/
draft: true              # optional, hides it from the live site
---

Post content.
```

Quote any frontmatter value that contains a colon.

## Adding a lab experiment

Put a standalone page at `public/lab/<name>/index.html`. It shows up in the `/lab/` gallery on the next build.

- **Title:** the page's `<title>`
- **Description:** `<meta name="description" content="...">`
- **Order:** `<meta name="date" content="YYYY-MM-DD">` (always set this; file dates are not reliable on the build server)
- **Thumbnail:** `cover.png`, `.jpg` or `.webp` in the same folder, otherwise a live preview
- Folders starting with `_` or `.` are skipped

## Where things live

- `src/lib/site.ts`: site name, tagline, navigation
- `src/styles/global.css`: colors (light and dark), fonts, shared styles
- `src/components/Footer.astro`: social links
- `wrangler.jsonc`: Cloudflare deploy config and custom domain
