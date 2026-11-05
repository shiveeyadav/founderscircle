import type { MotionProps } from 'framer-motion';

/** Simple fade used by lists in the aside, people and explore pages. */
export const fadeIn: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8 }
};
