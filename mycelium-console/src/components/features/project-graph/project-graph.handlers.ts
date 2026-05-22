import { applyNodeChanges, type Node } from '@xyflow/react';
import type { Dispatch, MouseEvent, SetStateAction } from 'react';
import type { SyncProjectGraphLayoutParams } from './project-graph.types';
import {
  buildProjectGraphEdges,
  buildProjectGraphNodes,
} from './project-graph-builders';

export function handleProjectEdgesChange(): void {}

export function createProjectNodeClickHandler(
  setSelectedNodeId: Dispatch<SetStateAction<string | null>>,
  openSheet: (id: string) => void,
) {
  return function handleProjectNodeClick(_event: MouseEvent, node: Node): void {
    setSelectedNodeId(node.id);
    openSheet(node.id);
  };
}

export function createProjectPaneClickHandler(
  setSelectedNodeId: Dispatch<SetStateAction<string | null>>,
  closeSheet: () => void,
) {
  return function handleProjectPaneClick(): void {
    setSelectedNodeId(null);
    closeSheet();
  };
}

export function createProjectGraphExitHandler(
  setSelectedNodeId: Dispatch<SetStateAction<string | null>>,
  closeSheet: () => void,
) {
  return function handleProjectGraphExit(): void {
    setSelectedNodeId(null);
    closeSheet();
  };
}

export function createProjectGraphEdgeVisibilityChangeHandler(
  setShowAllEdges: Dispatch<SetStateAction<boolean>>,
) {
  return function handleProjectGraphEdgeVisibilityChange(
    checked: boolean,
  ): void {
    setShowAllEdges(checked);
  };
}

export function createProjectNodesChangeHandler(
  setNodes: Dispatch<SetStateAction<Node[]>>,
) {
  return function handleProjectNodesChange(
    changes: Parameters<typeof applyNodeChanges>[0],
  ): void {
    setNodes((currentNodes) => applyNodeChanges(changes, currentNodes));
  };
}

export async function syncProjectGraphLayout({
  findById,
  layout,
  setEdges,
  setNodes,
}: SyncProjectGraphLayoutParams): Promise<void> {
  const nodes = await buildProjectGraphNodes(layout, findById);
  const edges = buildProjectGraphEdges(layout);

  setNodes(nodes);
  setEdges(edges);
}
