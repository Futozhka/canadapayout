// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// The real address the site opens on. Change it when the custom domain is connected (week 5).
const SITE = 'https://canadapayout.shinrv2006.workers.dev';

export default defineConfig({
	site: SITE,
	trailingSlash: 'always',
	integrations: [
		sitemap({
			filter: (page) => !page.endsWith('/404/'),
		}),
	],
});
