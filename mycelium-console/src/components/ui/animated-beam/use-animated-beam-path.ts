import { useEffect, useState } from 'react';
import { ANIMATED_BEAM_EMPTY_DIMENSIONS } from './animated-beam.config';
import { calculateAnimatedBeamPath } from './animated-beam.geometry';
import type {
  AnimatedBeamOffsets,
  AnimatedBeamPathState,
  AnimatedBeamProps,
} from './animated-beam.types';

export function useAnimatedBeamPath({
  containerRef,
  fromRef,
  toRef,
  curvature,
  offsets,
}: Pick<
  AnimatedBeamProps,
  'containerRef' | 'fromRef' | 'toRef' | 'curvature'
> & {
  offsets: AnimatedBeamOffsets;
}): AnimatedBeamPathState {
  const [pathState, setPathState] = useState<AnimatedBeamPathState>({
    pathD: '',
    dimensions: ANIMATED_BEAM_EMPTY_DIMENSIONS,
  });
  const startXOffset = offsets.startXOffset;
  const startYOffset = offsets.startYOffset;
  const endXOffset = offsets.endXOffset;
  const endYOffset = offsets.endYOffset;

  useEffect(() => {
    const beamOffsets = {
      startXOffset,
      startYOffset,
      endXOffset,
      endYOffset,
    };
    const updatePath = createUpdatePathHandler(
      containerRef.current,
      fromRef.current,
      toRef.current,
      curvature,
      beamOffsets,
      setPathState,
    );
    const observer = createResizeObserver(containerRef.current, updatePath);

    updatePath();

    return function cleanupResizeObserver(): void {
      observer?.disconnect();
    };
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ]);

  return pathState;
}

function createResizeObserver(
  container: HTMLElement | null,
  updatePath: () => void,
): ResizeObserver | null {
  if (!container) {
    return null;
  }

  const resizeObserver = new ResizeObserver(updatePath);
  resizeObserver.observe(container);
  return resizeObserver;
}

function createUpdatePathHandler(
  container: HTMLElement | null,
  from: HTMLElement | null,
  to: HTMLElement | null,
  curvature: number | undefined,
  offsets: AnimatedBeamOffsets,
  setPathState: (pathState: AnimatedBeamPathState) => void,
) {
  return function updatePath(): void {
    const nextPathState = calculateAnimatedBeamPath(
      container,
      from,
      to,
      curvature ?? 0,
      offsets,
    );
    setPathState(nextPathState);
  };
}
