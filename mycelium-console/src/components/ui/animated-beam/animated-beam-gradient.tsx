import { motion } from 'motion/react';
import {
  ANIMATED_BEAM_EASE,
  ANIMATED_BEAM_GRADIENT_END_OFFSET,
  ANIMATED_BEAM_GRADIENT_INITIAL,
  ANIMATED_BEAM_GRADIENT_MID_OFFSET,
  ANIMATED_BEAM_GRADIENT_TRANSPARENT_OPACITY,
} from './animated-beam.config';
import type { AnimatedBeamGradientProps } from './animated-beam.types';

export function AnimatedBeamGradient({
  coordinates,
  delay,
  duration,
  gradientStartColor,
  gradientStopColor,
  id,
  repeat,
  repeatDelay,
}: AnimatedBeamGradientProps) {
  return (
    <motion.linearGradient
      className='transform-gpu'
      id={id}
      gradientUnits='userSpaceOnUse'
      initial={ANIMATED_BEAM_GRADIENT_INITIAL}
      animate={coordinates}
      transition={{
        delay,
        duration,
        ease: ANIMATED_BEAM_EASE,
        repeat,
        repeatDelay,
      }}
    >
      <stop
        stopColor={gradientStartColor}
        stopOpacity={ANIMATED_BEAM_GRADIENT_TRANSPARENT_OPACITY}
      />
      <stop stopColor={gradientStartColor} />
      <stop
        offset={ANIMATED_BEAM_GRADIENT_MID_OFFSET}
        stopColor={gradientStopColor}
      />
      <stop
        offset={ANIMATED_BEAM_GRADIENT_END_OFFSET}
        stopColor={gradientStopColor}
        stopOpacity={ANIMATED_BEAM_GRADIENT_TRANSPARENT_OPACITY}
      />
    </motion.linearGradient>
  );
}
