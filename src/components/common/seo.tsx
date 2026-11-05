import { useRouter } from 'next/router';
import Head from 'next/head';
import { siteURL } from '@lib/site';

type MainLayoutProps = {
  title: string;
  image?: string;
  description?: string;
};

/**
 * Per-page metadata. Keys match the defaults in AppHead so a page's values
 * replace the site-wide ones instead of being emitted twice.
 */
export function SEO({
  title,
  image,
  description
}: MainLayoutProps): JSX.Element {
  const { asPath } = useRouter();

  const url = `${siteURL}${asPath === '/' ? '' : asPath.split('?')[0]}`;

  return (
    <Head>
      <title>{title}</title>
      <meta property='og:title' content={title} key='og:title' />
      {description && (
        <meta name='description' content={description} key='description' />
      )}
      {description && (
        <meta
          property='og:description'
          content={description}
          key='og:description'
        />
      )}
      {image && (
        <meta
          property='og:image'
          content={image.startsWith('/') ? `${siteURL}${image}` : image}
          key='og:image'
        />
      )}
      <meta property='og:url' content={url} key='og:url' />
      <link rel='canonical' href={url} key='canonical' />
    </Head>
  );
}
