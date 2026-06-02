import { domAnimation, LazyMotion, m, useReducedMotion } from 'motion/react';
import {
  ANIMATED_BEAM_EASE,
  ANIMATED_BEAM_GRADIENT_END_OFFSET,
  ANIMATED_BEAM_GRADIENT_INITIAL,
  ANIMATED_BEAM_GRADIENT_MID_OFFSET,
  ANIMATED_BEAM_GRADIENT_TRANSPARENT_OPACITY,
  ANIMATED_BEAM_REDUCED_MOTION_DURATION,
  ANIMATED_BEAM_REDUCED_MOTION_REPEAT,
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
  const shouldReduceMotion = useReducedMotion();
  const gradientAnimation = shouldReduceMotion
    ? ANIMATED_BEAM_GRADIENT_INITIAL
    : coordinates;
  const gradientTransition = shouldReduceMotion
    ? {
        duration: ANIMATED_BEAM_REDUCED_MOTION_DURATION,
        repeat: ANIMATED_BEAM_REDUCED_MOTION_REPEAT,
      }
    : {
        delay,
        duration,
        ease: ANIMATED_BEAM_EASE,
        repeat,
        repeatDelay,
      };

  return (
    <LazyMotion features={domAnimation}>
      <m.linearGradient
        className='transform-gpu'
        id={id}
        gradientUnits='userSpaceOnUse'
        initial={ANIMATED_BEAM_GRADIENT_INITIAL}
        animate={gradientAnimation}
        transition={gradientTransition}
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
      </m.linearGradient>
    </LazyMotion>
  );
}
