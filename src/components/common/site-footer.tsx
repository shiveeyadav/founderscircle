import Link from 'next/link';
import cn from 'clsx';
import { footerLinks, operatorName } from '@lib/site';

type SiteFooterProps = {
  className?: string;
};

/** Footer shared by the login page and the right-hand aside. */
export function SiteFooter({ className }: SiteFooterProps): JSX.Element {
  return (
    <footer
      className={cn(
        'flex flex-col gap-3 text-center text-sm text-light-secondary dark:text-dark-secondary',
        className
      )}
    >
      <nav className='flex flex-wrap justify-center gap-x-3 gap-y-1'>
        {footerLinks.map(({ href, label }) => (
          <Link className='custom-underline' href={href} key={href}>
            {label}
          </Link>
        ))}
      </nav>
      <p>
        © {new Date().getFullYear()} {operatorName}
      </p>
    </footer>
  );
}
