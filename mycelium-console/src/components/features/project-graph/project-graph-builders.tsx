import type { Edge, Node } from '@xyflow/react';
import type { ReactFlowLayout } from '@/api/services/react-flow/react-flow-service.types';
import type { Service } from '@/api/services/services/services-service.types';
import { NodeContent } from '@/components/features/react-flow/project-node/project-node';
import { ProjectNodeTypeName } from '@/components/features/react-flow/project-node/project-node.types';
import { createForcePositions } from './force-layout/force-layout';
import { EMPTY_GRAPH_POSITION } from './force-layout/force-layout.config';
import {
  FALLBACK_NODE_MICROSERVICE_COUNT,
  ProjectGraphEdgeTypeName,
  ProjectGraphPrefix,
  SERVICE_NODE_MICROSERVICE_COUNT,
} from './project-graph.config';
import type { GraphNode, GraphPosition } from './project-graph.types';

export async function buildProjectGraphNodes(
  layout: ReactFlowLayout,
  findById: (id: string) => Promise<Service>,
): Promise<Node[]> {
  const positionsByNodeId = createForcePositions(layout.nodes, layout.edges);
  const nodePromises = layout.nodes.map((node) => {
    return buildProjectGraphNode(node, positionsByNodeId, findById);
  });

  return Promise.all(nodePromises);
}

export function buildProjectGraphEdges(layout: ReactFlowLayout): Edge[] {
  return layout.edges.map((edge) => {
    return Object.assign({}, edge, {
      type: ProjectGraphEdgeTypeName.Magic,
    });
  });
}

async function buildProjectGraphNode(
  node: GraphNode,
  positionsByNodeId: Map<string, GraphPosition>,
  findById: (id: string) => Promise<Service>,
): Promise<Node> {
  const position = positionsByNodeId.get(node.id) ?? EMPTY_GRAPH_POSITION;
  const serviceId = getServiceId(node.id);

  if (!serviceId) {
    return buildFallbackGraphNode(node, position);
  }

  const service = await findById(serviceId);
  return buildServiceGraphNode(node, position, service);
}

function buildFallbackGraphNode(
  node: GraphNode,
  position: GraphPosition,
): Node {
  let label = node.id;
  if (typeof node.data?.label === 'string') {
    label = node.data.label;
  }

  const service = { name: label };
  const content = <NodeContent service={service} />;
  const data = Object.assign({}, node.data, {
    microservices: FALLBACK_NODE_MICROSERVICE_COUNT,
    content,
  });

  return Object.assign({}, node, {
    position,
    type: ProjectNodeTypeName.Custom,
    data,
  });
}

function buildServiceGraphNode(
  node: GraphNode,
  position: GraphPosition,
  service: Service,
): Node {
  const nodeContentService = {
    name: service.name,
    description: service.description,
    meta: service.version,
    repository: service.repository,
  };
  const content = <NodeContent service={nodeContentService} />;
  const data = Object.assign({}, node.data, {
    microservices: SERVICE_NODE_MICROSERVICE_COUNT,
    content,
  });

  return Object.assign({}, node, {
    position,
    type: ProjectNodeTypeName.Custom,
    data,
  });
}

function getServiceId(nodeId: string): string {
  if (!nodeId.startsWith(ProjectGraphPrefix.Integration)) {
    return '';
  }

  return nodeId.replace(ProjectGraphPrefix.Integration, '').trim();
}
