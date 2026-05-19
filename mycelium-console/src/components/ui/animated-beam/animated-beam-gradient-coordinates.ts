import type { AnimatedBeamGradientCoordinates } from './animated-beam.types';

export function getGradientCoordinates(
  reverse: boolean,
): AnimatedBeamGradientCoordinates {
  if (reverse) {
    return {
      x1: ['90%', '-10%'],
      x2: ['100%', '0%'],
      y1: ['0%', '0%'],
      y2: ['0%', '0%'],
    };
  }

  return {
    x1: ['10%', '110%'],
    x2: ['0%', '100%'],
    y1: ['0%', '0%'],
    y2: ['0%', '0%'],
  };
}
