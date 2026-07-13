import type { EdgeProps, Position } from '@xyflow/react';
import type {
  ReactFlowEdgeCommunication,
  ReactFlowEdgeRequestSummary,
} from '@/api/services/react-flow/react-flow-service.types';

export interface MagicBeamEdgeData {
  borderRadius?: number;
  communicationCount?: number;
  communications?: ReactFlowEdgeCommunication[];
  delay?: number;
  duration?: number;
  gradientStartColor?: string;
  pathColor?: string;
  pathOpacity?: number;
  pathWidth?: number;
  reverse?: boolean;
  requests?: ReactFlowEdgeRequestSummary[];
  sourceLabel?: string;
  targetLabel?: string;
}

export interface MagicBeamEdgePathLayout {
  labelX: number;
  labelY: number;
  path: string;
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
