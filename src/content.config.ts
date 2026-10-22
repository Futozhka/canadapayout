import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One Markdown file in src/content/guides = one page at /guides/<file-name>/.
const guides = defineCollection({
	loader: glob({ base: './src/content/guides', pattern: '**/*.md' }),
	schema: z.object({
		// <title>: 30–60 characters
		title: z.string().max(70),
		// meta description: 110–155 characters
		description: z.string().min(70).max(170),
		// on-page H1; falls back to title
		h1: z.string().optional(),
		// short topic label shown on cards (Withdrawals, Verification, …)
		category: z.string().optional(),
		// position in guide lists (1 = first); guides without it come after, newest first
		order: z.number().optional(),
		published: z.coerce.date(),
		updated: z.coerce.date().optional(),
		// drafts are not built, not in the sitemap, not linked anywhere
		draft: z.boolean().default(false),
		// rendered as a visible FAQ section AND as FAQPage markup, so the two always match
		faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
		// slugs of other guides to link to at the end of the page
		related: z.array(z.string()).default([]),
	}),
});

export const collections = { guides };
