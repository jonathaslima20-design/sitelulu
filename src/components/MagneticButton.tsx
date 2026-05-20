import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, type ReactNode, type MouseEvent } from 'react';

type Props = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  strength?: number;
};

export default function MagneticButton({ children, onClick, className = '', strength = 0.35 }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className={className}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
}
