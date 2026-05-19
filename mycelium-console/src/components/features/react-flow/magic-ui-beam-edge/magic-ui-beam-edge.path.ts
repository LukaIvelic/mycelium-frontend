import { getSmoothStepPath } from '@xyflow/react';
import type { EdgeEndpoints } from './magic-ui-beam-edge.types';

export function createMagicBeamEdgePath(
  endpoints: EdgeEndpoints,
  borderRadius: number,
): string {
  const [path] = getSmoothStepPath({
    sourceX: endpoints.sourceX,
    sourceY: endpoints.sourceY,
    sourcePosition: endpoints.sourcePosition,
    targetX: endpoints.targetX,
    targetY: endpoints.targetY,
    targetPosition: endpoints.targetPosition,
    borderRadius,
  });

  return path;
}
