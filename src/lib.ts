import { getCollection } from 'astro:content';
import { SITE_NAME, AUTHOR } from './consts';

export async function getPublishedGuides() {
	const all = await getCollection('guides', ({ data }) => !data.draft);
	return all.sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf());
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
}) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: opts.headline,
		description: opts.description,
		mainEntityOfPage: opts.url,
		datePublished: opts.published.toISOString(),
		dateModified: (opts.updated ?? opts.published).toISOString(),
		author: { '@type': 'Organization', name: AUTHOR.name },
		publisher: { '@type': 'Organization', name: SITE_NAME },
	};
}

export function formatDate(d: Date) {
	return d.toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });
}
