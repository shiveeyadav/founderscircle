import Link from 'next/link';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import cn from 'clsx';
import { where, orderBy } from 'firebase/firestore';
import { useInfiniteScroll } from '@lib/hooks/useInfiniteScroll';
import { tweetsCollection } from '@lib/firebase/collections';
import { pageTitle } from '@lib/site';
import {
  POST_CATEGORIES,
  postCategoryMeta,
  isPostCategory
} from '@lib/founder';
import {
  ExploreLayout,
  PublicLayout
} from '@components/layout/common-layout';
import { MainLayout } from '@components/layout/main-layout';
import { SEO } from '@components/common/seo';
import { MainHeader } from '@components/home/main-header';
import { MainContainer } from '@components/home/main-container';
import { Tweet } from '@components/tweet/tweet';
import { StatsEmpty } from '@components/tweet/stats-empty';
import { HeroIcon } from '@components/ui/hero-icon';
import { Loading } from '@components/ui/loading';
import type { ReactElement, ReactNode } from 'react';
import type { PostCategory } from '@lib/founder';

export default function Explore(): JSX.Element {
  const { query, back } = useRouter();

  const category = isPostCategory(query.category) ? query.category : null;

  const title = category
    ? `${postCategoryMeta[category].label} · Explore`
    : 'Explore';

  return (
    <MainContainer>
      <SEO
        title={pageTitle(title)}
        description='Questions, wins, job posts, co-founder searches and feedback requests from the founder community.'
      />
      <MainHeader useActionButton title='Explore' action={back} />
      <nav
        className='flex gap-2 overflow-x-auto border-b border-light-border px-4 py-3
                   dark:border-dark-border'
        aria-label='Post categories'
      >
        <CategoryChip category={null} active={!category} />
        {POST_CATEGORIES.map((item) => (
          <CategoryChip category={item} active={item === category} key={item} />
        ))}
      </nav>
      {/* Keyed so paging state resets when the category changes. */}
      <ExploreFeed category={category} key={category ?? 'all'} />
    </MainContainer>
  );
}

type CategoryChipProps = {
  category: PostCategory | null;
  active: boolean;
};

function CategoryChip({ category, active }: CategoryChipProps): JSX.Element {
  const meta = category ? postCategoryMeta[category] : null;

  return (
    <Link
      className={cn(
        `accent-tab flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1
         text-sm font-bold transition`,
        active
          ? 'border-main-accent bg-main-accent text-white'
          : 'border-light-line-reply hover:bg-main-accent/10 dark:border-dark-border'
      )}
      href={category ? `/explore?category=${category}` : '/explore'}
      aria-current={active ? 'page' : undefined}
      shallow
      replace
    >
      {meta && <HeroIcon className='h-4 w-4' iconName={meta.iconName} />}
      {meta ? meta.label : 'All'}
    </Link>
  );
}

function ExploreFeed({
  category
}: {
  category: PostCategory | null;
}): JSX.Element {
  // Uses the (category, createdAt) composite index in firestore.indexes.json.
  // Only top-level posts carry a category, so no parent filter is needed.
  const { data, loading, LoadMore } = useInfiniteScroll(
    tweetsCollection,
    category
      ? [where('category', '==', category), orderBy('createdAt', 'desc')]
      : [where('parent', '==', null), orderBy('createdAt', 'desc')],
    { includeUser: true, allowNull: true, preserve: true }
  );

  if (loading) return <Loading className='mt-5' />;

  if (!data)
    return (
      <StatsEmpty
        title={
          category
            ? `No “${postCategoryMeta[category].label}” posts yet`
            : 'Nothing here yet'
        }
        description='Be the first — pick a category when you write your next post.'
      />
    );

  return (
    <section className='mt-0.5'>
      <AnimatePresence mode='popLayout'>
        {data.map((tweet) => (
          <Tweet {...tweet} key={tweet.id} />
        ))}
      </AnimatePresence>
      <LoadMore />
    </section>
  );
}

Explore.getLayout = (page: ReactElement): ReactNode => (
  <PublicLayout>
    <MainLayout>
      <ExploreLayout>{page}</ExploreLayout>
    </MainLayout>
  </PublicLayout>
);
