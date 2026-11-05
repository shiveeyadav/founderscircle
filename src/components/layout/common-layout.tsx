import { useRequireAuth } from '@lib/hooks/useRequireAuth';
import { Aside } from '@components/aside/aside';
import { AsideCategories } from '@components/aside/aside-categories';
import { Suggestions } from '@components/aside/suggestions';
import { Placeholder } from '@components/common/placeholder';
import type { ReactNode } from 'react';

export type LayoutProps = {
  children: ReactNode;
};

export function ProtectedLayout({ children }: LayoutProps): JSX.Element {
  const user = useRequireAuth();

  if (!user) return <Placeholder />;

  return <>{children}</>;
}

/**
 * For pages anyone may view, signed in or not — profiles and individual
 * posts. These are the pages search engines index, so they must never
 * redirect a signed-out visitor away.
 */
export function PublicLayout({ children }: LayoutProps): JSX.Element {
  return <>{children}</>;
}

export function HomeLayout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      {children}
      <Aside>
        <AsideCategories />
        <Suggestions />
      </Aside>
    </>
  );
}

export function UserLayout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      {children}
      <Aside>
        <Suggestions />
        <AsideCategories />
      </Aside>
    </>
  );
}

export function ExploreLayout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      {children}
      <Aside>
        <Suggestions />
      </Aside>
    </>
  );
}

export function PeopleLayout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      {children}
      <Aside>
        <AsideCategories />
      </Aside>
    </>
  );
}
