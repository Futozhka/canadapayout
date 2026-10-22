// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// The canonical address of the site. The old workers.dev address 301-redirects here (worker/index.js).
const SITE = 'https://canadapayout.com';

export default defineConfig({
	site: SITE,
	trailingSlash: 'always',
	// The whole stylesheet is ~3.5 KB, so inline it: no render-blocking CSS request.
	build: { inlineStylesheets: 'always' },
	integrations: [
		sitemap({
			filter: (page) => !page.endsWith('/404/'),
		}),
	],
});
