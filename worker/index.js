// Sends the old workers.dev address and www to the canonical domain with a permanent 301,
// keeping the path and query.
// Everything else is served from the built Astro site in ./dist (including public/_redirects).
const CANONICAL_HOST = 'canadapayout.com';
const OLD_HOST = 'canadapayout.shinrv2006.workers.dev';

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const host = url.hostname;
		const isOldHost = host === OLD_HOST || host === `www.${CANONICAL_HOST}`;
		if (isOldHost) {
			url.protocol = 'https:';
			url.hostname = CANONICAL_HOST;
			url.port = '';
			return Response.redirect(url.toString(), 301);
		}
		const response = await env.ASSETS.fetch(request);
		// Preview builds (<version>-canadapayout.….workers.dev) stay viewable for review but are never indexed.
		if (host.endsWith('.workers.dev')) {
			const preview = new Response(response.body, response);
			preview.headers.set('X-Robots-Tag', 'noindex');
			return preview;
		}
		return response;
	},
};
