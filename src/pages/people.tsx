import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { where } from 'firebase/firestore';
import { useAuth } from '@lib/context/auth-context';
import { usersCollection } from '@lib/firebase/collections';
import { useInfiniteScroll } from '@lib/hooks/useInfiniteScroll';
import { pageTitle } from '@lib/site';
import {
  INDUSTRIES,
  COMPANY_STAGES,
  LOOKING_FOR,
  industryLabels,
  companyStageLabels,
  lookingForLabels,
  isIndustry,
  isCompanyStage,
  isLookingFor
} from '@lib/founder';
import {
  PeopleLayout,
  PublicLayout
} from '@components/layout/common-layout';
import { MainLayout } from '@components/layout/main-layout';
import { SEO } from '@components/common/seo';
import { MainHeader } from '@components/home/main-header';
import { MainContainer } from '@components/home/main-container';
import { UserCard } from '@components/user/user-card';
import { StatsEmpty } from '@components/tweet/stats-empty';
import { Loading } from '@components/ui/loading';
import { fadeIn } from '@components/ui/motion';
import type { ChangeEvent, ReactElement, ReactNode } from 'react';
import type { QueryConstraint } from 'firebase/firestore';
import type { CompanyStage, Industry, LookingFor } from '@lib/founder';

type PeopleFilters = {
  industry: Industry | null;
  stage: CompanyStage | null;
  lookingFor: LookingFor | null;
};

type FilterKey = keyof PeopleFilters;

export default function People(): JSX.Element {
  const { query, replace, back } = useRouter();

  const filters: PeopleFilters = {
    industry: isIndustry(query.industry) ? query.industry : null,
    stage: isCompanyStage(query.stage) ? query.stage : null,
    lookingFor: isLookingFor(query.lookingFor) ? query.lookingFor : null
  };

  const setFilter =
    (key: FilterKey) =>
    ({ target: { value } }: ChangeEvent<HTMLSelectElement>): void => {
      const next: Record<string, string> = {};

      (Object.keys(filters) as FilterKey[]).forEach((filterKey) => {
        const current = filterKey === key ? value : filters[filterKey];
        if (current) next[filterKey] = current;
      });

      void replace({ pathname: '/people', query: next }, undefined, {
        shallow: true
      });
    };

  const filterKey = `${filters.industry ?? ''}|${filters.stage ?? ''}|${
    filters.lookingFor ?? ''
  }`;

  return (
    <MainContainer>
      <SEO
        title={pageTitle('Find founders')}
        description='Browse founders, investors and advisors by industry, stage and what they are looking for.'
      />
      <MainHeader useActionButton title='Find founders' action={back} />
      <section
        className='grid grid-cols-1 gap-2 border-b border-light-border px-4 py-3
                   dark:border-dark-border xs:grid-cols-3'
        aria-label='Filters'
      >
        <FilterSelect
          id='filter-industry'
          label='Industry'
          value={filters.industry}
          options={INDUSTRIES}
          labels={industryLabels}
          onChange={setFilter('industry')}
        />
        <FilterSelect
          id='filter-stage'
          label='Stage'
          value={filters.stage}
          options={COMPANY_STAGES}
          labels={companyStageLabels}
          onChange={setFilter('stage')}
        />
        <FilterSelect
          id='filter-looking-for'
          label='Looking for'
          value={filters.lookingFor}
          options={LOOKING_FOR}
          labels={lookingForLabels}
          onChange={setFilter('lookingFor')}
        />
      </section>
      {/* Keyed by the filters so paging state resets whenever they change. */}
      <PeopleList filters={filters} key={filterKey} />
    </MainContainer>
  );
}

type FilterSelectProps = {
  id: string;
  label: string;
  value: string | null;
  options: readonly string[];
  labels: Readonly<Record<string, string>>;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

function FilterSelect({
  id,
  label,
  value,
  options,
  labels,
  onChange
}: FilterSelectProps): JSX.Element {
  return (
    <label className='flex flex-col gap-1 text-sm' htmlFor={id}>
      <span className='text-light-secondary dark:text-dark-secondary'>
        {label}
      </span>
      <select
        className='accent-tab cursor-pointer rounded-full bg-main-search-background px-3 py-1.5
                   text-base outline-none'
        id={id}
        value={value ?? ''}
        onChange={onChange}
      >
        <option value=''>Any</option>
        {options.map((option) => (
          <option value={option} key={option}>
            {labels[option]}
          </option>
        ))}
      </select>
    </label>
  );
}

function PeopleList({ filters }: { filters: PeopleFilters }): JSX.Element {
  const { user } = useAuth();

  const { industry, stage, lookingFor } = filters;
  const hasFilters = !!(industry ?? stage ?? lookingFor);

  // Equality and array-contains filters are served by Firestore's automatic
  // index merging, so no composite index is needed. The `!=` used for the
  // unfiltered list can't be combined with them without one, so in filtered
  // views the signed-in user is skipped on the client instead.
  const constraints: QueryConstraint[] = hasFilters
    ? [
        ...(industry ? [where('industry', '==', industry)] : []),
        ...(stage ? [where('stage', '==', stage)] : []),
        ...(lookingFor
          ? [where('lookingFor', 'array-contains', lookingFor)]
          : [])
      ]
    : [where('id', '!=', user?.id ?? 'null')];

  const { data, loading, LoadMore } = useInfiniteScroll(
    usersCollection,
    constraints,
    { allowNull: true, preserve: true },
    { marginBottom: 500 }
  );

  const people = data?.filter(({ id }) => id !== user?.id) ?? null;

  if (loading) return <Loading className='mt-5' />;

  if (!people?.length)
    return hasFilters ? (
      <StatsEmpty
        title='No matches yet'
        description='Nobody fits all of these filters right now. Try widening them — or post a "Looking for co-founder" update so the right people can find you.'
      />
    ) : (
      <StatsEmpty
        title='No one here yet'
        description='Invite a founder friend to join you.'
      />
    );

  return (
    <section>
      <motion.div className='mt-0.5' {...fadeIn}>
        {people.map((userData) => (
          <UserCard {...userData} key={userData.id} follow />
        ))}
      </motion.div>
      <LoadMore />
    </section>
  );
}

People.getLayout = (page: ReactElement): ReactNode => (
  <PublicLayout>
    <MainLayout>
      <PeopleLayout>{page}</PeopleLayout>
    </MainLayout>
  </PublicLayout>
);
