import type { Edge } from '@xyflow/react';

export function getVisibleProjectGraphEdges(
  edges: Edge[],
  selectedNodeId: string | null,
  showAllEdges: boolean,
): Edge[] {
  if (showAllEdges) {
    return edges;
  }

  if (!selectedNodeId) {
    return [];
  }

  return edges.filter((edge) => {
    return edge.source === selectedNodeId || edge.target === selectedNodeId;
  });
}
