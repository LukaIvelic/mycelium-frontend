import type { TargetAndTransition } from 'motion/react';
import type { RefObject } from 'react';

export interface AnimatedBeamProps {
  className?: string;
  containerRef: RefObject<HTMLElement | null>;
  curvature?: number;
  delay?: number;
  duration?: number;
  endXOffset?: number;
  endYOffset?: number;
  fromRef: RefObject<HTMLElement | null>;
  gradientStartColor?: string;
  gradientStopColor?: string;
  pathColor?: string;
  pathOpacity?: number;
  pathWidth?: number;
  repeat?: number;
  repeatDelay?: number;
  reverse?: boolean;
  startXOffset?: number;
  startYOffset?: number;
  toRef: RefObject<HTMLElement | null>;
}

export interface AnimatedBeamDimensions {
  height: number;
  width: number;
}

export interface AnimatedBeamPathState {
  dimensions: AnimatedBeamDimensions;
  pathD: string;
}

export interface AnimatedBeamOffsets {
  endXOffset: number;
  endYOffset: number;
  startXOffset: number;
  startYOffset: number;
}

export type AnimatedBeamGradientCoordinates = TargetAndTransition;

export interface AnimatedBeamGradientProps {
  coordinates: AnimatedBeamGradientCoordinates;
  delay: number;
  duration: number;
  gradientStartColor: string;
  gradientStopColor: string;
  id: string;
  repeat: number;
  repeatDelay: number;
}
