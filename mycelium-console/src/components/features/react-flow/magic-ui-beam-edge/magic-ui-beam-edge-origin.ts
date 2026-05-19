import type { BeamOrigin, EdgeEndpoints } from './magic-ui-beam-edge.types';

export function getBeamOrigin(
  endpoints: EdgeEndpoints,
  reverse: boolean,
): BeamOrigin {
  if (reverse) {
    return {
      startX: endpoints.targetX,
      startY: endpoints.targetY,
      endX: endpoints.sourceX,
      endY: endpoints.sourceY,
    };
  }

  return {
    startX: endpoints.sourceX,
    startY: endpoints.sourceY,
    endX: endpoints.targetX,
    endY: endpoints.targetY,
  };
}
