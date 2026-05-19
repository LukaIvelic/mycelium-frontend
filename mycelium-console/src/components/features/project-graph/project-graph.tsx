'use client';

import {
  Background,
  Controls,
  type Edge,
  type Node,
  ReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { use, useEffect, useState } from 'react';
import { Sheet } from '@/components/layout/sheet/sheet';
import { useReactFlowLayout } from '@/hooks/use-react-flow-layout.hook';
import { useServices } from '@/hooks/use-services.hook';
import { useSheet } from '@/hooks/use-sheet.hook';
import {
  PROJECT_GRAPH_CONTAINER_STYLE,
  PROJECT_GRAPH_EDGE_TYPES,
  PROJECT_GRAPH_MAX_ZOOM,
  PROJECT_GRAPH_MIN_ZOOM,
  PROJECT_GRAPH_NODE_TYPES,
} from './project-graph.config';
import {
  createProjectNodeClickHandler,
  createProjectNodesChangeHandler,
  createProjectPaneClickHandler,
  handleProjectEdgesChange,
  syncProjectGraphLayout,
} from './project-graph.handlers';
import type { ProjectGraphProps } from './project-graph.types';

export function ProjectGraph({ params }: ProjectGraphProps) {
  const [hasMounted, setHasMounted] = useState<boolean>(false);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const { id: projectId } = use(params);
  const { useFindByProjectId } = useReactFlowLayout();
  const { findById } = useServices();
  const { openSheet, closeSheet } = useSheet();
  const { data: layout } = useFindByProjectId(projectId);
  const visibleEdges = getVisibleEdges(edges, selectedNodeId);
  const handleNodeClick = createProjectNodeClickHandler(
    setSelectedNodeId,
    openSheet,
  );
  const handlePaneClick = createProjectPaneClickHandler(
    setSelectedNodeId,
    closeSheet,
  );
  const handleNodesChange = createProjectNodesChangeHandler(setNodes);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!projectId || !layout) {
      return;
    }

    void syncProjectGraphLayout({ layout, findById, setNodes, setEdges });
  }, [findById, projectId, layout]);

  return (
    <div style={PROJECT_GRAPH_CONTAINER_STYLE}>
      <ReactFlow
        fitView
        nodeTypes={PROJECT_GRAPH_NODE_TYPES}
        nodes={nodes}
        edges={visibleEdges}
        edgeTypes={PROJECT_GRAPH_EDGE_TYPES}
        onEdgesChange={handleProjectEdgesChange}
        proOptions={{ hideAttribution: true }}
        maxZoom={PROJECT_GRAPH_MAX_ZOOM}
        minZoom={PROJECT_GRAPH_MIN_ZOOM}
        snapToGrid
        className='relative'
        onNodeClick={handleNodeClick}
        onPaneClick={handlePaneClick}
        onNodesChange={handleNodesChange}
      >
        <Background />
        {hasMounted && (
          <Controls className='text-foreground bg-background scale-110' />
        )}
        <Sheet />
      </ReactFlow>
    </div>
  );
}

function getVisibleEdges(edges: Edge[], selectedNodeId: string | null): Edge[] {
  if (!selectedNodeId) {
    return [];
  }

  return edges.filter((edge) => {
    return edge.source === selectedNodeId || edge.target === selectedNodeId;
  });
}
