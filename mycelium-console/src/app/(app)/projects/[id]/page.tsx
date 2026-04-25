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

export default function Page({ params }: Props) {
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
    if (!projectId || !layout) return;

    const fetchLayout = async () => {
      const nodes = layout.nodes;
      const edges = layout.edges;

      const modifiedNodes = nodes.map(async (n) => {
        if (!n.id.startsWith('service:')) {
          return {
            ...n,
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

        const id = n.id.replace('service:', '');
        const service = await findById(id);

        return {
          ...n,
          type: 'custom',
          data: {
            ...n.data,
            microservices: 10,
            content: (
              <NodeContent
                service={{
                  name: service.service_name,
                  description: service.service_description,
                  meta: service.service_version,
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
        className='relative'
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
        <Controls className='text-foreground bg-background scale-110' />
        <Sheet />
      </ReactFlow>
    </div>
  );
}
