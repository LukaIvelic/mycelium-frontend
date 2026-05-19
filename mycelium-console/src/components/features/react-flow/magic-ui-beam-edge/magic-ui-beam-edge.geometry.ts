import { type InternalNode, Position } from '@xyflow/react';
import {
  MAGIC_BEAM_FALLBACK_LENGTH,
  MAGIC_BEAM_NODE_CENTER_DIVISOR,
  MAGIC_BEAM_OVERSHOOT_RATIO,
} from './magic-ui-beam-edge.config';
import type { BeamCoords, EdgeEndpoints } from './magic-ui-beam-edge.types';
import { getBeamOrigin } from './magic-ui-beam-edge-origin';

export function getEdgeEndpoints(
  sourceNode: InternalNode,
  targetNode: InternalNode,
): EdgeEndpoints {
  const sourceCenter = getNodeCenter(sourceNode);
  const targetCenter = getNodeCenter(targetNode);
  const sourcePosition = pickSide(sourceNode, targetCenter);
  const targetPosition = pickSide(targetNode, sourceCenter);
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

export function calcBeamCoords(
  endpoints: EdgeEndpoints,
  reverse: boolean,
): BeamCoords {
  const { sourceX, sourceY, targetX, targetY } = endpoints;
  const length = Math.hypot(targetX - sourceX, targetY - sourceY);
  const safeLength = length || MAGIC_BEAM_FALLBACK_LENGTH;
  const origin = getBeamOrigin(endpoints, reverse);
  const unitX = (origin.endX - origin.startX) / safeLength;
  const unitY = (origin.endY - origin.startY) / safeLength;
  const overshoot = safeLength * MAGIC_BEAM_OVERSHOOT_RATIO;

  return {
    x1From: origin.startX - unitX * safeLength,
    y1From: origin.startY - unitY * safeLength,
    x2From: origin.startX - unitX * overshoot,
    y2From: origin.startY - unitY * overshoot,
    x1To: origin.endX + unitX * overshoot,
    y1To: origin.endY + unitY * overshoot,
    x2To: origin.endX + unitX * safeLength,
    y2To: origin.endY + unitY * safeLength,
  };
}

function getNodeCenter(node: InternalNode): { x: number; y: number } {
  const width = node.measured.width ?? 0;
  const height = node.measured.height ?? 0;

  return {
    x:
      node.internals.positionAbsolute.x +
      width / MAGIC_BEAM_NODE_CENTER_DIVISOR,
    y:
      node.internals.positionAbsolute.y +
      height / MAGIC_BEAM_NODE_CENTER_DIVISOR,
  };
}

function pickSide(
  node: InternalNode,
  target: { x: number; y: number },
): Position {
  const center = getNodeCenter(node);
  const deltaX = target.x - center.x;
  const deltaY = target.y - center.y;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    return deltaX > 0 ? Position.Right : Position.Left;
  }

  return deltaY > 0 ? Position.Bottom : Position.Top;
}

function getPointOnSide(
  node: InternalNode,
  side: Position,
): { x: number; y: number } {
  const { x, y } = node.internals.positionAbsolute;
  const width = node.measured.width ?? 0;
  const height = node.measured.height ?? 0;

  switch (side) {
    case Position.Left:
      return { x, y: y + height / MAGIC_BEAM_NODE_CENTER_DIVISOR };
    case Position.Right:
      return { x: x + width, y: y + height / MAGIC_BEAM_NODE_CENTER_DIVISOR };
    case Position.Top:
      return { x: x + width / MAGIC_BEAM_NODE_CENTER_DIVISOR, y };
    case Position.Bottom:
      return { x: x + width / MAGIC_BEAM_NODE_CENTER_DIVISOR, y: y + height };
  }
}
