import Link from 'next/link';
import { motion } from 'framer-motion';
import { POST_CATEGORIES, postCategoryMeta } from '@lib/founder';
import { HeroIcon } from '@components/ui/hero-icon';
import { fadeIn } from '@components/ui/motion';

/** Replaces the old trends box: quick links into each post category. */
export function AsideCategories(): JSX.Element {
  return (
    <section className='hover-animation rounded-2xl bg-main-sidebar-background'>
      <motion.div className='inner:px-4 inner:py-3' {...fadeIn}>
        <h2 className='text-xl font-extrabold'>Browse by topic</h2>
        {POST_CATEGORIES.map((category) => {
          const { label, iconName } = postCategoryMeta[category];
          return (
            <Link
              className='accent-tab hover-card flex items-center gap-3 font-bold'
              href={`/explore?category=${category}`}
              key={category}
            >
              <HeroIcon
                className='h-5 w-5 text-main-accent'
                iconName={iconName}
              />
              {label}
            </Link>
          );
        })}
        <Link
          className='custom-button accent-tab hover-card block w-full rounded-2xl
                     rounded-t-none text-center text-main-accent'
          href='/guidelines'
        >
          Community guidelines
        </Link>
      </motion.div>
    </section>
  );
}
