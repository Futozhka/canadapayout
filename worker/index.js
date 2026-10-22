// Sends every request that is not on the canonical domain to it with a permanent 301,
// keeping the path and query: the old workers.dev address and www both end up on canadapayout.com.
// Everything else is served from the built Astro site in ./dist (including public/_redirects).
const CANONICAL_HOST = 'canadapayout.com';

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const host = url.hostname;
		const isOldHost = host.endsWith('.workers.dev') || host === `www.${CANONICAL_HOST}`;
		if (isOldHost) {
			url.protocol = 'https:';
			url.hostname = CANONICAL_HOST;
			url.port = '';
			return Response.redirect(url.toString(), 301);
		}
		return env.ASSETS.fetch(request);
	},
};
