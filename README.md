# devlog — MDX developer blog & portfolio

A full-stack Next.js project built to be portfolio-ready out of the box:
an MDX-powered blog with real syntax highlighting, a projects showcase,
and the SEO/discovery plumbing (sitemap, RSS, OG images, structured data)
that's easy to skip and annoying to bolt on later.

## Feature list

**Content & writing**
- MDX posts in `content/posts/*.mdx` with frontmatter (title, description,
  date, tags) — no database, no CMS, just files you can edit in any editor.
- Server-side syntax highlighting via Shiki (`rehype-pretty-code`) — zero
  highlighter JS shipped to the browser.
- Copy-to-clipboard button on every code block.
- Optional named code block titles (` ```ts title="lib/posts.ts" `).
- Custom `<Callout type="tip|info|warn">` component usable directly inside
  MDX for asides.
- Auto-generated heading anchors + a scroll-spy table of contents on each
  post.
- Reading time and word count computed automatically per post.
- Related posts (by shared tags) at the bottom of each article.
- Tag pages (`/tags/[tag]`) and a tag cloud on the blog index.
- Instant client-side search (Fuse.js) across titles, descriptions and
  tags, with its own lightweight JSON index endpoint (`/api/search`).
- Pagination on the blog index.
- A persistent view counter per post (Upstash Redis when configured, a
  local JSON file otherwise — see "Persistent view counts" below).
- Optional comments via [giscus](https://giscus.app) — GitHub
  Discussions-backed, no separate database. Hidden automatically until
  configured.

**SEO & discovery**
- Per-page metadata (title templates, description, canonical URLs) using
  the App Router Metadata API.
- Dynamically generated Open Graph images per post (`next/og`). Posts with
  a designed static cover (`public/images/covers/`, set via the `cover`
  frontmatter field) use that file as both the in-app hero image and the
  OG image; posts without one get a generated fallback automatically.
- `BlogPosting` and `Person` JSON-LD structured data.
- Auto-generated `sitemap.xml`, `robots.txt`, and an RSS feed at
  `/feed.xml`.
- A generated favicon and web app manifest.

**Portfolio**
- `/projects` grid with stack tags and links to live sites / source.
- `/about` and `/contact` pages, the latter backed by a real (swappable)
  API route.
- Newsletter signup form wired to its own API route.

**Engineering**
- Next.js 14 App Router, TypeScript throughout, strict mode on.
- A small hand-rolled design system on top of Tailwind (named color and
  spacing tokens in `tailwind.config.ts`, not raw utility soup).
- Light/dark theme with system-preference detection, persisted in
  `localStorage`, with a no-flash inline script in `<head>`.
- Loading skeleton, custom 404 page, and a route-level error boundary.
- Responsive down to small mobile, visible keyboard focus rings, and
  `prefers-reduced-motion` respected by the one animated component (the
  terminal hero).

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in NEXT_PUBLIC_SITE_URL at minimum
npm run dev
```

Open `http://localhost:3000`.

## Project structure

```
content/posts/*.mdx        Blog posts — add a file here to publish a post
src/app/                   Routes (App Router)
src/components/            UI components, mostly small and single-purpose
src/lib/                   Data access (posts.ts), utilities, views store
src/types/                 Shared TypeScript types
```

## Writing a post

Add a new file to `content/posts/`, e.g. `content/posts/my-post.mdx`:

```mdx
---
title: "Post title"
description: "One sentence for the card and meta description."
date: "2026-05-01"
tags: ["nextjs", "react"]
draft: false
---

Your MDX content here. Headings, code blocks, `<Callout>`, images via
`![alt](/images/whatever.png)` — all of it works.
```

Posts with `draft: true` are excluded from production builds but still
visible in `next dev`, so you can preview before publishing.

## Persistent view counts

`src/lib/views.ts` supports two backends, chosen automatically:

- **Upstash Redis** (recommended for Vercel/serverless) — create a free
  database at [upstash.com](https://upstash.com), then set
  `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` in your
  environment. Counts persist forever and stay correct across multiple
  server instances.
- **Local JSON file** (`.data/views.json`) — used automatically when the
  Upstash variables aren't set. Fine for local dev or any host with a
  real persistent disk (a VPS, Railway, Render, Docker with a volume).
  It will **not** stay consistent on serverless platforms where each
  invocation can land on a different, ephemeral filesystem — use Redis
  there.

No code changes are needed to switch between them — it's purely based on
which environment variables are present.

## Cover images

Each sample post has a designed cover image in `public/images/covers/`,
generated to match the site's own design tokens (the diff-style highlight
treatment is the same one used on real code blocks). Set `cover` in a
post's frontmatter to point at an image and it's used both as the in-app
hero/thumbnail and as that post's Open Graph image — see
`src/app/blog/[slug]/opengraph-image.tsx` for how the fallback works for
posts that don't set one.

## Environment variables

See `.env.example` for the full list. Nothing is required to run the site
locally — everything degrades gracefully:
- No `NEXT_PUBLIC_SITE_URL` → metadata falls back to `localhost:3000`.
- No `RESEND_API_KEY` / `CONTACT_TO_EMAIL` → contact form logs submissions
  to the server console instead of emailing them.
- No `NEXT_PUBLIC_GISCUS_*` → the comments section shows a short note
  instead of an embed.

## Deploying

The project is a standard Next.js app — it deploys to Vercel, Netlify, or
any Node host with zero config beyond setting the environment variables
above. Set `NEXT_PUBLIC_SITE_URL` to your real domain before deploying;
it's used by the sitemap, RSS feed, canonical URLs, and OG metadata.

```bash
npm run build
npm run start
```

## Honest limitations / natural next steps

This is a complete, working full-stack app, not a toy — but a few pieces
are intentionally simple rather than over-engineered for a starter:

- **Contact and newsletter forms** log to the server console until you
  add a real provider (Resend is wired up as an example for contact).
- **No automated tests** are included. The structure (small, pure
  functions in `src/lib`) is test-friendly if you want to add Vitest or
  Jest.
- **No authentication/admin UI** — posts are files, edited and deployed
  through your normal Git workflow rather than a CMS.

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · MDX
(`next-mdx-remote`) · Shiki (`rehype-pretty-code`) · Fuse.js ·
`next/og` for image generation.
