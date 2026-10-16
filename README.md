# CanadaPayout

Information site about casino withdrawals for Canadian players. Astro, static build, deployed to Cloudflare Workers.

## Run

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output in dist/
```

## Where things are

| What | File |
| --- | --- |
| Site name, author, pre-launch noindex switch | `src/consts.ts` |
| Site URL (change when the domain is connected) | `astro.config.mjs`, `public/robots.txt` |
| Guides (one Markdown file = one page) | `src/content/guides/*.md` |
| Guide fields: title, description, FAQ, related | `src/content.config.ts` |
| Page template for guides (H1, byline, FAQ, schema) | `src/layouts/Guide.astro` |
| Head tags: canonical, robots, OG, JSON-LD | `src/components/BaseHead.astro` |
| Wagering calculator | `src/pages/tools/wagering-calculator.astro` |

## Publishing a guide

1. Copy the draft in `src/content/guides/`, fill the text from the brief.
2. Put FAQ items in the `faq` field: they render on the page and as FAQPage markup, so both always match.
3. Set `draft: false`, run `npm run build`, push.
4. Before the first guide goes live, set `SITE_INDEXABLE = true` in `src/consts.ts`.
