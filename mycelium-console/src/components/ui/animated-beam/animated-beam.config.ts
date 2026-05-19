import type { AnimatedBeamDimensions } from './animated-beam.types';

export const ANIMATED_BEAM_DEFAULT_CURVATURE = 0;
export const ANIMATED_BEAM_DEFAULT_DELAY = 0;
export const ANIMATED_BEAM_DEFAULT_DURATION = 5;
export const ANIMATED_BEAM_DEFAULT_GRADIENT_START = '#ffaa40';
export const ANIMATED_BEAM_DEFAULT_GRADIENT_STOP = '#9c40ff';
export const ANIMATED_BEAM_DEFAULT_OFFSET = 0;
export const ANIMATED_BEAM_DEFAULT_PATH_COLOR = 'gray';
export const ANIMATED_BEAM_DEFAULT_PATH_OPACITY = 0.2;
export const ANIMATED_BEAM_DEFAULT_PATH_WIDTH = 2;
export const ANIMATED_BEAM_DEFAULT_REPEAT = Infinity;
export const ANIMATED_BEAM_DEFAULT_REPEAT_DELAY = 0;
export const ANIMATED_BEAM_DEFAULT_REVERSE = false;
export const ANIMATED_BEAM_EMPTY_DIMENSIONS: AnimatedBeamDimensions = {
  width: 0,
  height: 0,
};
export const ANIMATED_BEAM_CENTER_DIVISOR = 2;
export const ANIMATED_BEAM_EASE = [0.16, 1, 0.3, 1] as const;
export const ANIMATED_BEAM_GRADIENT_INITIAL = {
  x1: '0%',
  x2: '0%',
  y1: '0%',
  y2: '0%',
};
export const ANIMATED_BEAM_GRADIENT_MID_OFFSET = '32.5%';
export const ANIMATED_BEAM_GRADIENT_END_OFFSET = '100%';
export const ANIMATED_BEAM_GRADIENT_TRANSPARENT_OPACITY = '0';
