import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
} from 'd3-force';
import type {
  ForceNode,
  GraphEdge,
  GraphNode,
  GraphPosition,
} from '../project-graph.types';
import {
  FORCE_COLLIDE_RADIUS,
  FORCE_EDGE_DISTANCE,
  FORCE_EDGE_STRENGTH,
  FORCE_LAYOUT_RADIUS_BASE,
  FORCE_LAYOUT_RADIUS_PER_NODE,
  FORCE_MANY_BODY_STRENGTH,
  FORCE_POSITION_STRENGTH,
  FORCE_SIMULATION_TICKS,
  FULL_CIRCLE_RADIANS,
} from './force-layout.config';

export function createForcePositions(
  nodes: GraphNode[],
  edges: GraphEdge[],
): Map<string, GraphPosition> {
  if (nodes.length === 0) {
    return new Map();
  }

  const radius = Math.max(
    nodes.length * FORCE_LAYOUT_RADIUS_PER_NODE,
    FORCE_LAYOUT_RADIUS_BASE,
  );
  const forceNodes = createForceNodes(nodes, radius);
  const forceEdges = createForceEdges(edges);

  const simulation = forceSimulation(forceNodes)
    .force(
      'link',
      forceLink<ForceNode, GraphEdge>(forceEdges)
        .id(getForceNodeId)
        .distance(FORCE_EDGE_DISTANCE)
        .strength(FORCE_EDGE_STRENGTH),
    )
    .force('charge', forceManyBody().strength(FORCE_MANY_BODY_STRENGTH))
    .force('collide', forceCollide<ForceNode>().radius(FORCE_COLLIDE_RADIUS))
    .force('x', forceX<ForceNode>(0).strength(FORCE_POSITION_STRENGTH))
    .force('y', forceY<ForceNode>(0).strength(FORCE_POSITION_STRENGTH))
    .force('center', forceCenter(0, 0))
    .stop();

  for (let tick = 0; tick < FORCE_SIMULATION_TICKS; tick += 1) {
    simulation.tick();
  }

  return new Map(forceNodes.map(createForcePositionEntry));
}

function createForceNodes(nodes: GraphNode[], radius: number): ForceNode[] {
  return nodes.map((node, index) => {
    const angle = (index / nodes.length) * FULL_CIRCLE_RADIANS;

    return {
      id: node.id,
      x: node.position?.x ?? Math.cos(angle) * radius,
      y: node.position?.y ?? Math.sin(angle) * radius,
    };
  });
}

function createForceEdges(edges: GraphEdge[]): GraphEdge[] {
  return edges.map(({ source, target }) => ({ source, target }));
}

function createForcePositionEntry(node: ForceNode): [string, GraphPosition] {
  return [node.id, { x: Math.round(node.x), y: Math.round(node.y) }];
}

function getForceNodeId(node: ForceNode): string {
  return node.id;
}
