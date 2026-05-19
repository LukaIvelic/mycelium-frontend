import {
  ANIMATED_BEAM_CENTER_DIVISOR,
  ANIMATED_BEAM_EMPTY_DIMENSIONS,
} from './animated-beam.config';
import type {
  AnimatedBeamOffsets,
  AnimatedBeamPathState,
} from './animated-beam.types';

export function calculateAnimatedBeamPath(
  container: HTMLElement | null,
  from: HTMLElement | null,
  to: HTMLElement | null,
  curvature: number,
  offsets: AnimatedBeamOffsets,
): AnimatedBeamPathState {
  if (!container || !from || !to) {
    return { pathD: '', dimensions: ANIMATED_BEAM_EMPTY_DIMENSIONS };
  }

  const containerRect = container.getBoundingClientRect();
  const fromRect = from.getBoundingClientRect();
  const toRect = to.getBoundingClientRect();
  const dimensions = {
    width: containerRect.width,
    height: containerRect.height,
  };
  const startX = getCenteredX(fromRect, containerRect) + offsets.startXOffset;
  const startY = getCenteredY(fromRect, containerRect) + offsets.startYOffset;
  const endX = getCenteredX(toRect, containerRect) + offsets.endXOffset;
  const endY = getCenteredY(toRect, containerRect) + offsets.endYOffset;
  const controlX = (startX + endX) / ANIMATED_BEAM_CENTER_DIVISOR;
  const controlY = startY - curvature;
  const pathD = `M ${startX},${startY} Q ${controlX},${controlY} ${endX},${endY}`;

  return { pathD, dimensions };
}

function getCenteredX(rect: DOMRect, containerRect: DOMRect): number {
  return (
    rect.left - containerRect.left + rect.width / ANIMATED_BEAM_CENTER_DIVISOR
  );
}

function getCenteredY(rect: DOMRect, containerRect: DOMRect): number {
  return (
    rect.top - containerRect.top + rect.height / ANIMATED_BEAM_CENTER_DIVISOR
  );
}
