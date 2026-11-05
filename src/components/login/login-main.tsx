import { useState } from 'react';
import { useAuth } from '@lib/context/auth-context';
import { siteName, siteDescription } from '@lib/site';
import { CustomIcon } from '@components/ui/custom-icon';
import { HeroIcon } from '@components/ui/hero-icon';
import { Button } from '@components/ui/button';
import { EmailAuthModal } from '@components/modal/email-auth-modal';

type ModalMode = 'signup' | 'signin';

const highlights: Readonly<string[]> = [
  'Ask founders who have been there before',
  'Share wins and get honest feedback',
  'Find a co-founder, investors, mentors or your next hire'
];

export function LoginMain(): JSX.Element {
  const { signInWithGoogle } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>('signup');

  const openModal = (mode: ModalMode): void => {
    setModalMode(mode);
    setModalOpen(true);
  };

  return (
    <>
    <EmailAuthModal
      key={modalMode}
      open={modalOpen}
      initialMode={modalMode}
      closeModal={() => setModalOpen(false)}
    />
    <main className='grid lg:grid-cols-[1fr,45vw]'>
      <div
        className='relative hidden flex-col justify-center gap-8 overflow-hidden bg-gradient-to-br
                   from-[#1E1B4B] to-[#4F46E5] p-16 text-white lg:flex'
      >
        <i
          className='absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full border-[40px]
                     border-indigo-400/30'
        />
        <CustomIcon className='h-24 w-24' iconName='LogoIcon' />
        <ul className='relative flex max-w-md flex-col gap-4 text-xl'>
          {highlights.map((text) => (
            <li className='flex gap-3' key={text}>
              <HeroIcon
                className='h-7 w-7 shrink-0 text-indigo-200'
                iconName='CheckCircleIcon'
              />
              {text}
            </li>
          ))}
        </ul>
      </div>
      <div className='flex flex-col items-center justify-between gap-6 p-8 lg:items-start lg:justify-center'>
        <i className='mb-0 self-center lg:mb-10 lg:self-auto'>
          <CustomIcon className='h-10 w-10 lg:h-14 lg:w-14' iconName='LogoIcon' />
        </i>
        <div className='flex max-w-xs flex-col gap-4 font-extrabold lg:max-w-none lg:gap-12'>
          <h1 className='text-3xl lg:text-6xl'>Build with people who get it.</h1>
          <h2 className='text-xl lg:text-3xl'>Join {siteName} today.</h2>
          <p className='max-w-md text-base font-normal text-light-secondary dark:text-dark-secondary'>
            {siteDescription}
          </p>
        </div>
        <div className='flex max-w-xs flex-col gap-6 [&_button]:py-2'>
          <div className='grid gap-3 font-bold'>
            <Button
              className='flex justify-center gap-2 border border-light-line-reply font-bold text-light-primary transition
                         hover:bg-[#e6e6e6] focus-visible:bg-[#e6e6e6] active:bg-[#cccccc] dark:border-0 dark:bg-white
                         dark:hover:brightness-90 dark:focus-visible:brightness-90 dark:active:brightness-75'
              onClick={signInWithGoogle}
            >
              <CustomIcon iconName='GoogleIcon' /> Sign up with Google
            </Button>
            <Button
              className='bg-accent-blue text-white transition hover:brightness-90
                         focus-visible:!ring-accent-blue/80 focus-visible:brightness-90 active:brightness-75'
              onClick={() => openModal('signup')}
            >
              Sign up with email
            </Button>
          </div>
          <div className='flex flex-col gap-3'>
            <p className='font-bold'>Already have an account? </p>
            <Button
              className='border border-light-line-reply font-bold text-accent-blue hover:bg-accent-blue/10
                         focus-visible:bg-accent-blue/10 focus-visible:!ring-accent-blue/80 active:bg-accent-blue/20
                         dark:border-light-secondary'
              onClick={() => openModal('signin')}
            >
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
