import type { EdgeTypes, NodeTypes } from '@xyflow/react';
import MagicBeamEdge from '@/components/features/react-flow/magic-ui-beam-edge/magic-ui-beam-edge';
import { CustomNode } from '@/components/features/react-flow/project-node/project-node';
import { ProjectNodeTypeName } from '@/components/features/react-flow/project-node/project-node.types';

export enum ProjectGraphEdgeTypeName {
  Magic = 'magic',
}

export enum ProjectGraphPrefix {
  Integration = 'integration:',
}

export const PROJECT_GRAPH_CONTAINER_STYLE = {
  width: '100%',
  height: '100vh',
};

export const PROJECT_GRAPH_EDGE_TYPES: EdgeTypes = {
  [ProjectGraphEdgeTypeName.Magic]: MagicBeamEdge,
};

export const PROJECT_GRAPH_NODE_TYPES: NodeTypes = {
  [ProjectNodeTypeName.Custom]: CustomNode,
};

export const PROJECT_GRAPH_MAX_ZOOM = 1;
export const PROJECT_GRAPH_MIN_ZOOM = 0.75;
export const PROJECT_GRAPH_STORAGE_PREFIX = 'project-graph:positions:';
export const PROJECT_GRAPH_POSITION_SAVE_DELAY = 500;
export const FALLBACK_NODE_MICROSERVICE_COUNT = 0;
export const PROJECT_GRAPH_EDGE_VISIBILITY_LABEL = 'All edges';
export const PROJECT_GRAPH_STRUCTURE_LABEL = 'Structure';
export const SERVICE_NODE_MICROSERVICE_COUNT = 10;
