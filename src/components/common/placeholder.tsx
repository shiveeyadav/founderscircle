import { siteName, siteDescription } from '@lib/site';
import { CustomIcon } from '@components/ui/custom-icon';
import { SEO } from './seo';

export function Placeholder(): JSX.Element {
  return (
    <main className='flex min-h-screen items-center justify-center'>
      <SEO title={siteName} description={siteDescription} image='/og.png' />
      <i>
        <CustomIcon className='h-20 w-20' iconName='LogoIcon' />
      </i>
    </main>
  );
}
