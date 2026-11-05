import Link from 'next/link';
import cn from 'clsx';
import { isPostCategory, postCategoryMeta } from '@lib/founder';
import { HeroIcon } from '@components/ui/hero-icon';

type CategoryLabelProps = {
  category: unknown;
  /** Render as a link to the filtered explore page (not inside another link). */
  link?: boolean;
};

/**
 * Pill showing a post's category. Renders nothing for posts without one
 * (including everything created before categories existed) or with a value
 * this version doesn't know.
 */
export function CategoryLabel({
  category,
  link
}: CategoryLabelProps): JSX.Element | null {
  if (!isPostCategory(category)) return null;

  const { label, iconName, className } = postCategoryMeta[category];

  const classes = cn(
    'flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold',
    className
  );

  const content = (
    <>
      <HeroIcon className='h-3.5 w-3.5' iconName={iconName} />
      {label}
    </>
  );

  return link ? (
    <Link
      className={cn(classes, 'custom-underline')}
      href={`/explore?category=${category}`}
    >
      {content}
    </Link>
  ) : (
    <span className={classes}>{content}</span>
  );
}
