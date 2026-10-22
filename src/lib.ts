import { getCollection } from 'astro:content';
import { SITE_NAME, AUTHOR } from './consts';

export async function getPublishedGuides() {
	const all = await getCollection('guides', ({ data }) => !data.draft);
	// A published guide must not contain unresolved fact-check markers.
	for (const g of all) {
		const text = `${g.body ?? ''} ${JSON.stringify(g.data.faq)}`;
		if (text.includes('[CHECK')) {
			throw new Error(`Guide "${g.id}" is published but still contains [CHECK] markers. Resolve them or set draft: true.`);
		}
	}
	return all.sort(
		(a, b) =>
			(a.data.order ?? Infinity) - (b.data.order ?? Infinity) || b.data.published.valueOf() - a.data.published.valueOf(),
	);
}

export function absolute(path: string, site: URL | undefined) {
	return new URL(path, site).toString();
}

export type Crumb = { name: string; href: string };

export function breadcrumbSchema(crumbs: Crumb[], site: URL | undefined) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: crumbs.map((c, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: c.name,
			item: absolute(c.href, site),
		})),
	};
}

export function faqSchema(faq: { q: string; a: string }[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faq.map((f) => ({
			'@type': 'Question',
			name: f.q,
			acceptedAnswer: { '@type': 'Answer', text: f.a },
		})),
	};
}

export function articleSchema(opts: {
	headline: string;
	description: string;
	url: string;
	published: Date;
	updated?: Date;
	image?: string;
}) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: opts.headline,
		description: opts.description,
		mainEntityOfPage: opts.url,
		...(opts.image ? { image: opts.image } : {}),
		datePublished: opts.published.toISOString(),
		dateModified: (opts.updated ?? opts.published).toISOString(),
		author: { '@type': 'Organization', name: AUTHOR.name },
		publisher: { '@type': 'Organization', name: SITE_NAME },
	};
}

export function formatDate(d: Date) {
	return d.toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Reading time from the Markdown body, at ~200 words a minute.
export function readingMinutes(body: string | undefined) {
	const words = (body ?? '').replace(/[#>*_`|\[\]()-]/g, ' ').split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / 200));
}
