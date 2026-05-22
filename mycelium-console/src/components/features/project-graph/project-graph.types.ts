import type { Edge, Node, NodeChange } from '@xyflow/react';
import type { Dispatch, SetStateAction } from 'react';
import type { ReactFlowLayout } from '@/api/services/react-flow/react-flow-service.types';
import type { Service } from '@/api/services/services/services-service.types';

export interface ProjectGraphProps {
  params: Promise<{ id: string }>;
}

export interface GraphNode {
  id: string;
  data?: {
    label?: unknown;
  };
  position?: GraphPosition;
}

export interface GraphEdge {
  id?: string;
  source: string;
  target: string;
}

export interface GraphPosition {
  x: number;
  y: number;
}

export interface ForceNode extends GraphPosition {
  id: string;
}

export interface SyncProjectGraphLayoutParams {
  findById: (id: string) => Promise<Service>;
  layout: ReactFlowLayout;
  setEdges: Dispatch<SetStateAction<Edge[]>>;
  setNodes: Dispatch<SetStateAction<Node[]>>;
}

export interface UseProjectGraphLayoutSyncParams {
  findById: (id: string) => Promise<Service>;
  layout: ReactFlowLayout | undefined;
  setEdges: Dispatch<SetStateAction<Edge[]>>;
  setNodes: Dispatch<SetStateAction<Node[]>>;
}

export interface CreateProjectNodesChangeHandlerParams {
  setNodes: Dispatch<SetStateAction<Node[]>>;
}

export type ProjectNodesChangeHandler = (changes: NodeChange[]) => void;
