import { getSmoothStepPath } from '@xyflow/react';
import type {
  EdgeEndpoints,
  MagicBeamEdgePathLayout,
} from './magic-ui-beam-edge.types';

export function createMagicBeamEdgePath(
  endpoints: EdgeEndpoints,
  borderRadius: number,
): string {
  return createMagicBeamEdgePathLayout(endpoints, borderRadius).path;
}

export function createMagicBeamEdgePathLayout(
  endpoints: EdgeEndpoints,
  borderRadius: number,
): MagicBeamEdgePathLayout {
  const [path, labelX, labelY] = getSmoothStepPath({
    sourceX: endpoints.sourceX,
    sourceY: endpoints.sourceY,
    sourcePosition: endpoints.sourcePosition,
    targetX: endpoints.targetX,
    targetY: endpoints.targetY,
    targetPosition: endpoints.targetPosition,
    borderRadius,
  });

  return { labelX, labelY, path };
}
