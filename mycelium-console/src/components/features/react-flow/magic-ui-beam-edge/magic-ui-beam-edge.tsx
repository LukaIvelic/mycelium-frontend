import { BaseEdge, useInternalNode } from '@xyflow/react';
import { useId, useMemo } from 'react';
import { MagicBeamGradient } from './magic-beam-gradient';
import {
  DEFAULT_MAGIC_BEAM_BORDER_RADIUS,
  DEFAULT_MAGIC_BEAM_DELAY_SECONDS,
  DEFAULT_MAGIC_BEAM_DURATION_SECONDS,
  DEFAULT_MAGIC_BEAM_GRADIENT_COLOR,
  DEFAULT_MAGIC_BEAM_PATH_COLOR,
  DEFAULT_MAGIC_BEAM_PATH_OPACITY,
  DEFAULT_MAGIC_BEAM_PATH_WIDTH,
  DEFAULT_MAGIC_BEAM_REVERSE,
} from './magic-ui-beam-edge.config';
import {
  calcBeamCoords,
  getEdgeEndpoints,
} from './magic-ui-beam-edge.geometry';
import { createMagicBeamEdgePath } from './magic-ui-beam-edge.path';
import type {
  BeamCoords,
  EdgeEndpoints,
  MagicBeamEdgeProps,
} from './magic-ui-beam-edge.types';

export default function MagicBeamEdge({
  source,
  target,
  data,
}: MagicBeamEdgeProps) {
  const {
    reverse = DEFAULT_MAGIC_BEAM_REVERSE,
    duration = DEFAULT_MAGIC_BEAM_DURATION_SECONDS,
    delay = DEFAULT_MAGIC_BEAM_DELAY_SECONDS,
    pathColor = DEFAULT_MAGIC_BEAM_PATH_COLOR,
    pathWidth = DEFAULT_MAGIC_BEAM_PATH_WIDTH,
    pathOpacity = DEFAULT_MAGIC_BEAM_PATH_OPACITY,
    gradientStartColor = DEFAULT_MAGIC_BEAM_GRADIENT_COLOR,
    borderRadius = DEFAULT_MAGIC_BEAM_BORDER_RADIUS,
  } = data ?? {};
  const id = useId();
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);
  const endpoints = useMemo<EdgeEndpoints | null>(() => {
    if (!sourceNode || !targetNode) {
      return null;
    }

    return getEdgeEndpoints(sourceNode, targetNode);
  }, [sourceNode, targetNode]);
  const edgePath = useMemo<string | null>(() => {
    if (!endpoints) {
      return null;
    }

    return createMagicBeamEdgePath(endpoints, borderRadius);
  }, [endpoints, borderRadius]);
  const beam = useMemo<BeamCoords | null>(() => {
    if (!endpoints) {
      return null;
    }

    return calcBeamCoords(endpoints, reverse);
  }, [endpoints, reverse]);

  if (!edgePath || !beam) {
    return null;
  }

  const durationValue = `${duration}s`;
  const beginValue = `${delay}s`;

  return (
    <>
      <BaseEdge
        path={edgePath}
        style={{
          stroke: pathColor,
          strokeWidth: pathWidth,
          strokeOpacity: pathOpacity,
          strokeLinecap: 'round',
        }}
      />
      <path
        d={edgePath}
        fill='none'
        stroke={`url(#${id})`}
        strokeWidth={pathWidth}
        strokeLinecap='round'
      />
      <defs>
        <MagicBeamGradient
          id={id}
          beam={beam}
          durationValue={durationValue}
          beginValue={beginValue}
          gradientStartColor={gradientStartColor}
        />
      </defs>
    </>
  );
}
