import { siteURL } from '@lib/site';
import type { GetServerSideProps } from 'next';

/**
 * Served dynamically so the Sitemap line always points at NEXT_PUBLIC_URL
 * rather than a hard-coded domain.
 */
const rules = `# Public pages — profiles, posts and discovery — are open to crawlers.
User-agent: *
Allow: /$
Allow: /user/
Allow: /tweet/
Allow: /explore
Allow: /people
Allow: /welcome
Allow: /guidelines

# Signed-in areas hold nothing useful to a crawler and some are per-user.
Disallow: /home
Disallow: /notifications
Disallow: /bookmarks
Disallow: /api/
Disallow: /user/*/likes
Disallow: /user/*/followers
Disallow: /user/*/following
`;

export const getServerSideProps: GetServerSideProps = ({ res }) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=86400');
  res.write(`${rules}\nSitemap: ${siteURL}/sitemap.xml\n`);
  res.end();

  return Promise.resolve({ props: {} });
};

export default function Robots(): null {
  return null;
}
