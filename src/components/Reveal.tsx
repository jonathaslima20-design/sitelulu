import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'span' | 'section' | 'h1' | 'h2' | 'p';
};

const variants: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      delay: i,
    },
  }),
};

export default function Reveal({ children, delay = 0, className = '' }: Props) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}

export function StaggerGroup({ children, className = '', delay = 0.08 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: delay, delayChildren: 0.05 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
