import {
  BaseEdge,
  type EdgeProps,
  getSmoothStepPath,
  type InternalNode,
  Position,
  useInternalNode,
} from '@xyflow/react';
import { useId, useMemo } from 'react';

interface MagicBeamEdgeData {
  reverse?: boolean;
  duration?: number;
  delay?: number;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  borderRadius?: number;
}

interface EdgeEndpoints {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourcePosition: Position;
  targetPosition: Position;
}

function getNodeCenter(node: InternalNode): { x: number; y: number } {
  const w = node.measured.width ?? 0;
  const h = node.measured.height ?? 0;
  return {
    x: node.internals.positionAbsolute.x + w / 2,
    y: node.internals.positionAbsolute.y + h / 2,
  };
}

function pickSide(
  node: InternalNode,
  toward: { x: number; y: number },
): Position {
  const c = getNodeCenter(node);
  const dx = toward.x - c.x;
  const dy = toward.y - c.y;
  if (Math.abs(dx) > Math.abs(dy)) {
    return dx > 0 ? Position.Right : Position.Left;
  }
  return dy > 0 ? Position.Bottom : Position.Top;
}

function getPointOnSide(
  node: InternalNode,
  side: Position,
): { x: number; y: number } {
  const { x, y } = node.internals.positionAbsolute;
  const w = node.measured.width ?? 0;
  const h = node.measured.height ?? 0;
  switch (side) {
    case Position.Left:
      return { x, y: y + h / 2 };
    case Position.Right:
      return { x: x + w, y: y + h / 2 };
    case Position.Top:
      return { x: x + w / 2, y };
    case Position.Bottom:
      return { x: x + w / 2, y: y + h };
  }
}

interface BeamCoords {
  x1From: number;
  y1From: number;
  x2From: number;
  y2From: number;
  x1To: number;
  y1To: number;
  x2To: number;
  y2To: number;
}

function calcBeamCoords(
  endpoints: EdgeEndpoints,
  reverse: boolean,
): BeamCoords {
  const { sourceX, sourceY, targetX, targetY } = endpoints;
  const length = Math.hypot(targetX - sourceX, targetY - sourceY) || 1;

  const from = reverse
    ? { x: targetX, y: targetY, ex: sourceX, ey: sourceY }
    : { x: sourceX, y: sourceY, ex: targetX, ey: targetY };

  const ux = (from.ex - from.x) / length;
  const uy = (from.ey - from.y) / length;
  const overshoot = length * 0.5;

  return {
    x1From: from.x - ux * length,
    y1From: from.y - uy * length,
    x2From: from.x - ux * overshoot,
    y2From: from.y - uy * overshoot,
    x1To: from.ex + ux * overshoot,
    y1To: from.ey + uy * overshoot,
    x2To: from.ex + ux * length,
    y2To: from.ey + uy * length,
  };
}

function getEdgeEndpoints(
  sourceNode: InternalNode,
  targetNode: InternalNode,
): EdgeEndpoints {
  const sCenter = getNodeCenter(sourceNode);
  const tCenter = getNodeCenter(targetNode);

  const sourcePosition = pickSide(sourceNode, tCenter);
  const targetPosition = pickSide(targetNode, sCenter);

  const source = getPointOnSide(sourceNode, sourcePosition);
  const target = getPointOnSide(targetNode, targetPosition);

  return {
    sourceX: source.x,
    sourceY: source.y,
    targetX: target.x,
    targetY: target.y,
    sourcePosition,
    targetPosition,
  };
}

export default function MagicBeamEdge({
  source,
  target,
  data,
}: Omit<EdgeProps, 'data'> & { data?: MagicBeamEdgeData }) {
  const {
    reverse = false,
    duration = 1.5,
    delay = 0,
    pathColor = 'gray',
    pathWidth = 2.5,
    pathOpacity = 0.25,
    gradientStartColor = 'rgba(110,180,135,1)',
    borderRadius = 16,
  } = data ?? {};

  const trailColor = 'rgba(27,53,68,1)';
  const id = useId();

  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);

  const endpoints = useMemo<EdgeEndpoints | null>(() => {
    if (!sourceNode || !targetNode) return null;
    return getEdgeEndpoints(sourceNode, targetNode);
  }, [sourceNode, targetNode]);

  const edgePath = useMemo<string | null>(() => {
    if (!endpoints) return null;
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
  }, [endpoints, borderRadius]);

  const beam = useMemo(
    () => (endpoints ? calcBeamCoords(endpoints, reverse) : null),
    [endpoints, reverse],
  );

  if (!edgePath || !beam) return null;

  const dur = `${duration}s`;
  const begin = `${delay}s`;

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
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth={pathWidth}
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
          x1={beam.x1From}
          y1={beam.y1From}
          x2={beam.x2From}
          y2={beam.y2From}
        >
          <animate
            attributeName="x1"
            values={`${beam.x1From};${beam.x1To}`}
            dur={dur}
            begin={begin}
            repeatCount="indefinite"
          />
          <animate
            attributeName="y1"
            values={`${beam.y1From};${beam.y1To}`}
            dur={dur}
            begin={begin}
            repeatCount="indefinite"
          />
          <animate
            attributeName="x2"
            values={`${beam.x2From};${beam.x2To}`}
            dur={dur}
            begin={begin}
            repeatCount="indefinite"
          />
          <animate
            attributeName="y2"
            values={`${beam.y2From};${beam.y2To}`}
            dur={dur}
            begin={begin}
            repeatCount="indefinite"
          />
          <stop offset="0%" stopColor={trailColor} stopOpacity="0" />
          <stop offset="20%" stopColor={trailColor} stopOpacity="0.5" />
          <stop offset="67.5%" stopColor={gradientStartColor} />
          <stop offset="100%" stopColor={gradientStartColor} stopOpacity="0" />
        </linearGradient>
      </defs>
    </>
  );
}
