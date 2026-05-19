'use client';

import { useId } from 'react';
import { cn } from '@/lib/utils';
import {
  ANIMATED_BEAM_DEFAULT_CURVATURE,
  ANIMATED_BEAM_DEFAULT_DELAY,
  ANIMATED_BEAM_DEFAULT_DURATION,
  ANIMATED_BEAM_DEFAULT_GRADIENT_START,
  ANIMATED_BEAM_DEFAULT_GRADIENT_STOP,
  ANIMATED_BEAM_DEFAULT_OFFSET,
  ANIMATED_BEAM_DEFAULT_PATH_COLOR,
  ANIMATED_BEAM_DEFAULT_PATH_OPACITY,
  ANIMATED_BEAM_DEFAULT_PATH_WIDTH,
  ANIMATED_BEAM_DEFAULT_REPEAT,
  ANIMATED_BEAM_DEFAULT_REPEAT_DELAY,
  ANIMATED_BEAM_DEFAULT_REVERSE,
} from './animated-beam.config';
import type { AnimatedBeamProps } from './animated-beam.types';
import { AnimatedBeamGradient } from './animated-beam-gradient';
import { getGradientCoordinates } from './animated-beam-gradient-coordinates';
import { useAnimatedBeamPath } from './use-animated-beam-path';

export function AnimatedBeam({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = ANIMATED_BEAM_DEFAULT_CURVATURE,
  reverse = ANIMATED_BEAM_DEFAULT_REVERSE,
  duration = ANIMATED_BEAM_DEFAULT_DURATION,
  delay = ANIMATED_BEAM_DEFAULT_DELAY,
  pathColor = ANIMATED_BEAM_DEFAULT_PATH_COLOR,
  pathWidth = ANIMATED_BEAM_DEFAULT_PATH_WIDTH,
  pathOpacity = ANIMATED_BEAM_DEFAULT_PATH_OPACITY,
  gradientStartColor = ANIMATED_BEAM_DEFAULT_GRADIENT_START,
  gradientStopColor = ANIMATED_BEAM_DEFAULT_GRADIENT_STOP,
  repeat = ANIMATED_BEAM_DEFAULT_REPEAT,
  repeatDelay = ANIMATED_BEAM_DEFAULT_REPEAT_DELAY,
  startXOffset = ANIMATED_BEAM_DEFAULT_OFFSET,
  startYOffset = ANIMATED_BEAM_DEFAULT_OFFSET,
  endXOffset = ANIMATED_BEAM_DEFAULT_OFFSET,
  endYOffset = ANIMATED_BEAM_DEFAULT_OFFSET,
}: AnimatedBeamProps) {
  const id = useId();
  const offsets = { startXOffset, startYOffset, endXOffset, endYOffset };
  const { pathD, dimensions } = useAnimatedBeamPath({
    containerRef,
    fromRef,
    toRef,
    curvature,
    offsets,
  });
  const gradientCoordinates = getGradientCoordinates(reverse);

  return (
    <svg
      aria-hidden='true'
      fill='none'
      width={dimensions.width}
      height={dimensions.height}
      xmlns='http://www.w3.org/2000/svg'
      className={cn(
        'pointer-events-none absolute top-0 left-0 transform-gpu stroke-2',
        className,
      )}
      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap='round'
      />
      <path
        d={pathD}
        strokeWidth={pathWidth}
        stroke={`url(#${id})`}
        strokeOpacity='1'
        strokeLinecap='round'
      />
      <defs>
        <AnimatedBeamGradient
          coordinates={gradientCoordinates}
          delay={delay}
          duration={duration}
          gradientStartColor={gradientStartColor}
          gradientStopColor={gradientStopColor}
          id={id}
          repeat={repeat}
          repeatDelay={repeatDelay}
        />
      </defs>
    </svg>
  );
}
