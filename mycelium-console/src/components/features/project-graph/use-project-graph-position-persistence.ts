import type { Node } from '@xyflow/react';
import { useEffect } from 'react';
import { PROJECT_GRAPH_POSITION_SAVE_DELAY } from './project-graph.config';
import { writeStoredNodePositions } from './project-graph.persistence';

export function useProjectGraphPositionPersistence(
  projectId: string,
  nodes: Node[],
  enabled: boolean,
): void {
  useEffect(() => {
    if (!enabled || nodes.length === 0) {
      return;
    }

    const timeout = setTimeout(() => {
      writeStoredNodePositions(projectId, nodes);
    }, PROJECT_GRAPH_POSITION_SAVE_DELAY);

    return () => {
      clearTimeout(timeout);
    };
  }, [enabled, projectId, nodes]);
}
