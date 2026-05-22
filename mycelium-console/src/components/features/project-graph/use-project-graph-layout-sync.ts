import { useEffect } from 'react';
import { syncProjectGraphLayout } from './project-graph.handlers';
import type { UseProjectGraphLayoutSyncParams } from './project-graph.types';

export function useProjectGraphLayoutSync({
  findById,
  layout,
  setEdges,
  setNodes,
}: UseProjectGraphLayoutSyncParams): void {
  useEffect(() => {
    if (!layout) {
      return;
    }

    void syncProjectGraphLayout({ layout, findById, setNodes, setEdges });
  }, [findById, layout, setEdges, setNodes]);
}
