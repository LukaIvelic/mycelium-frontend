'use client';

import {
  Background,
  Controls,
  type Edge,
  type Node,
  ReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {
  type Dispatch,
  type SetStateAction,
  use,
  useCallback,
  useEffect,
  useReducer,
} from 'react';
import { Sheet } from '@/components/layout/sheet/sheet';
import { useReactFlowLayout } from '@/hooks/use-react-flow-layout.hook';
import { useServices } from '@/hooks/use-services.hook';
import { useSheetActions } from '@/hooks/use-sheet.hook';
import {
  PROJECT_GRAPH_CONTAINER_STYLE,
  PROJECT_GRAPH_EDGE_TYPES,
  PROJECT_GRAPH_MAX_ZOOM,
  PROJECT_GRAPH_MIN_ZOOM,
  PROJECT_GRAPH_NODE_TYPES,
} from './project-graph.config';
import {
  createProjectGraphEdgeVisibilityChangeHandler,
  createProjectGraphExitHandler,
  createProjectGraphStructureChangeHandler,
  createProjectNodeClickHandler,
  createProjectNodesChangeHandler,
  createProjectPaneClickHandler,
  handleProjectEdgesChange,
} from './project-graph.handlers';
import { getVisibleProjectGraphEdges } from './project-graph.helpers';
import type { ProjectGraphProps } from './project-graph.types';
import { ProjectGraphEdgeVisibility } from './project-graph-edge-visibility';
import { ProjectGraphStructure } from './project-graph-structure';
import { useProjectGraphLayoutSync } from './use-project-graph-layout-sync';
import { useProjectGraphMounted } from './use-project-graph-mounted';
import { useProjectGraphPositionPersistence } from './use-project-graph-position-persistence';

interface ProjectGraphState {
  nodes: Node[];
  edges: Edge[];
  selectedNodeId: string | null;
  showAllEdges: boolean;
  applyStructure: boolean;
}

type ProjectGraphAction =
  | { type: 'nodesChanged'; value: SetStateAction<Node[]> }
  | { type: 'edgesChanged'; value: SetStateAction<Edge[]> }
  | {
      type: 'selectedNodeChanged';
      value: SetStateAction<string | null>;
    }
  | { type: 'edgeVisibilityChanged'; value: SetStateAction<boolean> }
  | { type: 'structureChanged'; value: SetStateAction<boolean> };

const PROJECT_GRAPH_INITIAL_STATE: ProjectGraphState = {
  nodes: [],
  edges: [],
  selectedNodeId: null,
  showAllEdges: false,
  applyStructure: false,
};

function resolveSetStateAction<T>(
  currentValue: T,
  value: SetStateAction<T>,
): T {
  return typeof value === 'function'
    ? (value as (previousValue: T) => T)(currentValue)
    : value;
}

function projectGraphReducer(
  state: ProjectGraphState,
  action: ProjectGraphAction,
): ProjectGraphState {
  switch (action.type) {
    case 'nodesChanged':
      return {
        ...state,
        nodes: resolveSetStateAction(state.nodes, action.value),
      };
    case 'edgesChanged':
      return {
        ...state,
        edges: resolveSetStateAction(state.edges, action.value),
      };
    case 'selectedNodeChanged':
      return {
        ...state,
        selectedNodeId: resolveSetStateAction(
          state.selectedNodeId,
          action.value,
        ),
      };
    case 'edgeVisibilityChanged':
      return {
        ...state,
        showAllEdges: resolveSetStateAction(state.showAllEdges, action.value),
      };
    case 'structureChanged':
      return {
        ...state,
        applyStructure: resolveSetStateAction(
          state.applyStructure,
          action.value,
        ),
      };
  }
}

export function ProjectGraph({ params }: ProjectGraphProps) {
  const [
    { nodes, edges, selectedNodeId, showAllEdges, applyStructure },
    dispatch,
  ] = useReducer(projectGraphReducer, PROJECT_GRAPH_INITIAL_STATE);
  const setNodes = useCallback<Dispatch<SetStateAction<Node[]>>>((value) => {
    dispatch({ type: 'nodesChanged', value });
  }, []);
  const setEdges = useCallback<Dispatch<SetStateAction<Edge[]>>>((value) => {
    dispatch({ type: 'edgesChanged', value });
  }, []);
  const setSelectedNodeId = useCallback<
    Dispatch<SetStateAction<string | null>>
  >((value) => {
    dispatch({ type: 'selectedNodeChanged', value });
  }, []);
  const setShowAllEdges = useCallback<Dispatch<SetStateAction<boolean>>>(
    (value) => {
      dispatch({ type: 'edgeVisibilityChanged', value });
    },
    [],
  );
  const setApplyStructure = useCallback<Dispatch<SetStateAction<boolean>>>(
    (value) => {
      dispatch({ type: 'structureChanged', value });
    },
    [],
  );

  const hasMounted = useProjectGraphMounted();
  const { id: projectId } = use(params);
  const { useFindByProjectId } = useReactFlowLayout();
  const { findById } = useServices();
  const { openSheet, closeSheet } = useSheetActions();
  const { data: layout } = useFindByProjectId(projectId);
  const visibleEdges = getVisibleProjectGraphEdges(
    edges,
    selectedNodeId,
    showAllEdges,
  );
  const handleEdgeVisibilityChange =
    createProjectGraphEdgeVisibilityChangeHandler(setShowAllEdges);
  const handleStructureChange =
    createProjectGraphStructureChangeHandler(setApplyStructure);
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
    return createProjectGraphExitHandler(setSelectedNodeId, closeSheet);
  }, [closeSheet, setSelectedNodeId]);

  useProjectGraphLayoutSync({
    applyStructure,
    layout,
    findById,
    projectId,
    setNodes,
    setEdges,
  });
  useProjectGraphPositionPersistence(projectId, nodes, !applyStructure);

  return (
    <div style={PROJECT_GRAPH_CONTAINER_STYLE} className='relative'>
      <div className='absolute left-4 top-4 z-10 flex items-center gap-2'>
        <ProjectGraphEdgeVisibility
          onCheckedChange={handleEdgeVisibilityChange}
          showAllEdges={showAllEdges}
        />
        <ProjectGraphStructure
          onCheckedChange={handleStructureChange}
          applyStructure={applyStructure}
        />
      </div>
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
