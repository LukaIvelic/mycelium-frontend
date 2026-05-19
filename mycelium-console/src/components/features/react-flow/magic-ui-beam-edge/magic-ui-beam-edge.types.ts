import type { EdgeProps, Position } from '@xyflow/react';

export interface MagicBeamEdgeData {
  borderRadius?: number;
  delay?: number;
  duration?: number;
  gradientStartColor?: string;
  pathColor?: string;
  pathOpacity?: number;
  pathWidth?: number;
  reverse?: boolean;
}

export interface EdgeEndpoints {
  sourcePosition: Position;
  sourceX: number;
  sourceY: number;
  targetPosition: Position;
  targetX: number;
  targetY: number;
}

export interface BeamCoords {
  x1From: number;
  x1To: number;
  x2From: number;
  x2To: number;
  y1From: number;
  y1To: number;
  y2From: number;
  y2To: number;
}

export interface BeamOrigin {
  endX: number;
  endY: number;
  startX: number;
  startY: number;
}

export interface MagicBeamEdgeProps extends Omit<EdgeProps, 'data'> {
  data?: MagicBeamEdgeData;
}
