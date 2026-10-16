// Site-wide settings. Everything an SEO changes often lives here, in one place.

export const SITE_NAME = 'CanadaPayout';
export const SITE_TAGLINE = 'Casino withdrawals in Canada, explained';
export const SITE_DESCRIPTION =
	'Plain-language guides to getting paid by online casinos in Canada: withdrawal methods, real payout times, bonus wagering and what to do when a cashout gets stuck.';

// Shown as the author of every guide. A team name, not a person: no personal name is published.
export const AUTHOR = {
	name: 'CanadaPayout Editorial Team',
};

// Pre-launch switch. While false, every page carries <meta name="robots" content="noindex,follow">
// so Google does not index an empty site. Set to true when the first guide is published.
export const SITE_INDEXABLE = false;

export const MIN_AGE = '19+';
