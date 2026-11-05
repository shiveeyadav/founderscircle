import Error from 'next/error';
import { useTheme } from '@lib/context/theme-context';
import { pageTitle } from '@lib/site';
import { SEO } from '@components/common/seo';

export default function NotFound(): JSX.Element {
  const { theme } = useTheme();

  const isDarkMode = ['dim', 'dark'].includes(theme);

  return (
    <>
      <SEO
        title={pageTitle('Page not found')}
        description='Sorry we couldn’t find the page you were looking for.'
      />
      <Error statusCode={404} withDarkMode={isDarkMode} />
    </>
  );
}
