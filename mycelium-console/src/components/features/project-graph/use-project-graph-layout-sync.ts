import { useEffect } from 'react';
import { syncProjectGraphLayout } from './project-graph.handlers';
import type { UseProjectGraphLayoutSyncParams } from './project-graph.types';

export function useProjectGraphLayoutSync({
  applyStructure,
  findById,
  layout,
  projectId,
  setEdges,
  setNodes,
}: UseProjectGraphLayoutSyncParams): void {
  useEffect(() => {
    if (!layout) {
      return;
    }

    void syncProjectGraphLayout({
      applyStructure,
      layout,
      findById,
      projectId,
      setNodes,
      setEdges,
    });
  }, [applyStructure, findById, layout, projectId, setEdges, setNodes]);
}
