'use client';

import {
  applyNodeChanges,
  Background,
  Controls,
  type Edge,
  type Node,
  type NodeChange,
  ReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  type SimulationNodeDatum,
} from 'd3-force';
import { use, useEffect, useState } from 'react';
import MagicBeamEdge from '@/components/features/react-flow/magic-ui-beam-edge';
import {
  NodeContent,
  nodeTypes,
} from '@/components/features/react-flow/project-node';
import { Sheet } from '@/components/layout/sheet/sheet';
import { useReactFlowLayout } from '@/hooks/use-react-flow-layout.hook';
import { useServices } from '@/hooks/use-services.hook';
import { useSheet } from '@/hooks/use-sheet.hook';

interface Props {
  params: Promise<{ id: string }>;
}

const edgeTypes = {
  magic: MagicBeamEdge,
};

type GraphNode = {
  id: string;
  position?: {
    x: number;
    y: number;
  };
};

type GraphEdge = {
  source: string;
  target: string;
};

type ForceNode = SimulationNodeDatum & {
  id: string;
};

function createForcePositions(
  nodes: GraphNode[],
  edges: GraphEdge[],
): Map<string, { x: number; y: number }> {
  if (nodes.length === 0) return new Map();

  const radius = Math.max(nodes.length * 80, 240);
  const forceNodes: ForceNode[] = nodes.map((node, index) => {
    const angle = (index / nodes.length) * Math.PI * 2;
    return {
      id: node.id,
      x: node.position?.x ?? Math.cos(angle) * radius,
      y: node.position?.y ?? Math.sin(angle) * radius,
    };
  });
  const forceEdges = edges.map((edge) => ({
    source: edge.source,
    target: edge.target,
  }));

  const simulation = forceSimulation(forceNodes)
    .force(
      'link',
      forceLink<ForceNode, { source: string; target: string }>(forceEdges)
        .id((node) => node.id)
        .distance(340)
        .strength(0.35),
    )
    .force('charge', forceManyBody().strength(-900))
    .force('collide', forceCollide<ForceNode>().radius(220))
    .force('x', forceX<ForceNode>(0).strength(0.06))
    .force('y', forceY<ForceNode>(0).strength(0.06))
    .force('center', forceCenter(0, 0))
    .stop();

  for (let i = 0; i < 220; i += 1) {
    simulation.tick();
  }

  return new Map(
    forceNodes.map((node) => [
      node.id,
      {
        x: Math.round(node.x ?? 0),
        y: Math.round(node.y ?? 0),
      },
    ]),
  );
}

export default function Page({ params }: Props) {
  const [hasMounted, setHasMounted] = useState(false);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const visibleEdges = selectedNodeId
    ? edges.filter(
        (e) => e.source === selectedNodeId || e.target === selectedNodeId,
      )
    : [];

  const { id: projectId } = use(params);
  const { useFindByProjectId } = useReactFlowLayout();
  const { findById } = useServices();
  const { openSheet, closeSheet } = useSheet();
  const { data: layout } = useFindByProjectId(projectId);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!projectId || !layout) return;

    const fetchLayout = async () => {
      const nodes = layout.nodes;
      const edges = layout.edges;
      const positionsByNodeId = createForcePositions(nodes, edges);

      const modifiedNodes = nodes.map(async (n) => {
        const position = positionsByNodeId.get(n.id) ?? { x: 0, y: 0 };

        const serviceId = n.id.startsWith('integration:')
          ? n.id.replace('integration:', '').trim()
          : '';

        if (!serviceId) {
          return {
            ...n,
            position,
            type: 'custom',
            data: {
              ...n.data,
              microservices: 0,
              content: (
                <NodeContent
                  service={{
                    name:
                      typeof n.data?.label === 'string' ? n.data.label : n.id,
                  }}
                />
              ),
            },
          };
        }

        const service = await findById(serviceId);

        return {
          ...n,
          position,
          type: 'custom',
          data: {
            ...n.data,
            microservices: 10,
            content: (
              <NodeContent
                service={{
                  name: service.name,
                  description: service.description,
                  meta: service.version,
                  repository: service.repository,
                }}
              />
            ),
          },
        };
      });

      const modifiedEdges = edges.map((e) => ({
        ...e,
        type: 'magic',
      }));

      setNodes(await Promise.all(modifiedNodes));
      setEdges(modifiedEdges);
    };

    fetchLayout();
  }, [findById, projectId, layout]);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlow
        fitView
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={visibleEdges}
        edgeTypes={edgeTypes}
        onEdgesChange={() => {}}
        proOptions={{ hideAttribution: true }}
        maxZoom={1}
        minZoom={0.75}
        snapToGrid
        className="relative"
        onNodeClick={(_, node) => {
          setSelectedNodeId(node.id);
          openSheet(node.id);
        }}
        onPaneClick={() => {
          setSelectedNodeId(null);
          closeSheet();
        }}
        onNodesChange={(changes: NodeChange[]) => {
          setNodes((nds) => applyNodeChanges(changes, nds));
        }}
      >
        <Background />
        {hasMounted ? (
          <Controls className="text-foreground bg-background scale-110" />
        ) : null}
        <Sheet />
      </ReactFlow>
    </div>
  );
}
