import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@components/ui/button';
import { HeroIcon } from '@components/ui/hero-icon';
import { ToolTip } from '@components/ui/tooltip';
import { variants } from './input';
import { ProgressBar } from './progress-bar';
import type { ChangeEvent, ClipboardEvent } from 'react';

type InputOptionsProps = {
  reply?: boolean;
  modal?: boolean;
  inputLimit: number;
  inputLength: number;
  isValidTweet: boolean;
  isCharLimitExceeded: boolean;
  handleImageUpload: (
    e: ChangeEvent<HTMLInputElement> | ClipboardEvent<HTMLTextAreaElement>
  ) => void;
};

export function InputOptions({
  reply,
  modal,
  inputLimit,
  inputLength,
  isValidTweet,
  isCharLimitExceeded,
  handleImageUpload
}: InputOptionsProps): JSX.Element {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const onClick = (): void => inputFileRef.current?.click();

  return (
    <motion.div className='flex justify-between' {...variants}>
      <div className='flex text-main-accent'>
        <input
          className='hidden'
          type='file'
          accept='image/*,video/*'
          onChange={handleImageUpload}
          ref={inputFileRef}
          multiple
        />
        <Button
          className='accent-tab accent-bg-tab group relative rounded-full p-2
                     hover:bg-main-accent/10 active:bg-main-accent/20'
          onClick={onClick}
        >
          <HeroIcon className='h-5 w-5' iconName='PhotoIcon' />
          <ToolTip tip='Photo or video' modal={modal} />
        </Button>
      </div>
      <div className='flex items-center gap-4'>
        <motion.div
          className='flex items-center gap-4'
          animate={
            inputLength ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
          }
        >
          <ProgressBar
            modal={modal}
            inputLimit={inputLimit}
            inputLength={inputLength}
            isCharLimitExceeded={isCharLimitExceeded}
          />
        </motion.div>
        <Button
          type='submit'
          className='accent-tab bg-main-accent px-4 py-1.5 font-bold text-white
                     enabled:hover:bg-main-accent/90
                     enabled:active:bg-main-accent/75'
          disabled={!isValidTweet}
        >
          {reply ? 'Reply' : 'Post'}
        </Button>
      </div>
    </motion.div>
  );
}
