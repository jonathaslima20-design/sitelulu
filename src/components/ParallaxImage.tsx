import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

type Props = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  range?: number;
};

export default function ParallaxImage({ src, alt, className = '', imgClassName = '', range = 60 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1.0, 1.05]);

  return (
    <div ref={ref} className={`overflow-hidden photo-frame ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale }}
        className={`w-full h-full object-cover ${imgClassName}`}
        loading="lazy"
      />
    </div>
  );
}
