import cn from 'clsx';
import { POST_CATEGORIES, postCategoryMeta } from '@lib/founder';
import { HeroIcon } from '@components/ui/hero-icon';
import type { PostCategory } from '@lib/founder';

type CategoryPickerProps = {
  category: PostCategory | null;
  handleCategory: (category: PostCategory | null) => void;
};

/** Optional category for a new post; clicking the active one clears it. */
export function CategoryPicker({
  category,
  handleCategory
}: CategoryPickerProps): JSX.Element {
  const toggle = (item: PostCategory) => (): void =>
    handleCategory(item === category ? null : item);

  return (
    <div
      className='flex flex-wrap gap-2'
      role='group'
      aria-label='Post category (optional)'
    >
      {POST_CATEGORIES.map((item) => {
        const { label, iconName } = postCategoryMeta[item];
        const selected = item === category;

        return (
          <button
            type='button'
            className={cn(
              `custom-button accent-tab flex items-center gap-1 border px-3 py-0.5 text-sm
               font-bold transition`,
              selected
                ? 'border-main-accent bg-main-accent text-white'
                : `border-light-line-reply text-main-accent hover:bg-main-accent/10
                   dark:border-light-secondary`
            )}
            aria-pressed={selected}
            onClick={toggle(item)}
            key={item}
          >
            <HeroIcon className='h-4 w-4' iconName={iconName} />
            {label}
          </button>
        );
      })}
    </div>
  );
}
