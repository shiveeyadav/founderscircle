/**
 * Single source of truth for FoundersCircle branding. Anything user-facing
 * that names the product, its URL or its contact details should read from
 * here rather than hard-coding a string.
 */

/** Public origin, e.g. https://founderscircle.example — no trailing slash. */
export const siteURL = (
  process.env.NEXT_PUBLIC_URL ?? 'http://localhost'
).replace(/\/+$/, '');

export const siteName = 'FoundersCircle';

/** Lower-case handle used for the demo post in the Display settings. */
export const siteHandle = 'founderscircle';

export const siteTagline = 'The social network for entrepreneurs';

export const siteDescription =
  'FoundersCircle is where founders, co-founders, investors and advisors share wins, ask for help, hire and find the people they need to build.';

/** Brand colour (also the default accent) — keep in sync with public/logo.svg. */
export const brandColor = '#4F46E5';

export const ogImage = `${siteURL}/og.png`;

/** Company operating the site, shown in footers and emails. */
export const operatorName =
  process.env.NEXT_PUBLIC_OPERATOR_NAME ?? 'Saint Michael Web Services Limited';

/** Optional profile featured first in "Who to follow". */
export const featuredUserId = process.env.NEXT_PUBLIC_FEATURED_UID ?? null;

/** Builds a page title such as "People / FoundersCircle". */
export function pageTitle(title?: string): string {
  return title ? `${title} / ${siteName}` : siteName;
}

export function absoluteURL(path = '/'): string {
  return `${siteURL}${path.startsWith('/') ? path : `/${path}`}`;
}

export const footerLinks: Readonly<{ href: string; label: string }[]> = [
  { href: '/welcome', label: 'Welcome' },
  { href: '/guidelines', label: 'Community guidelines' },
  { href: '/people', label: 'Find founders' }
];
