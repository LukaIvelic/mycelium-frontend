import type { Node } from '@xyflow/react';
import { PROJECT_GRAPH_STORAGE_PREFIX } from './project-graph.config';
import type { GraphPosition } from './project-graph.types';

export type StoredNodePositions = Record<string, GraphPosition>;

function buildStorageKey(projectId: string): string {
  return `${PROJECT_GRAPH_STORAGE_PREFIX}${projectId}`;
}

export function readStoredNodePositions(
  projectId: string,
): StoredNodePositions {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(buildStorageKey(projectId));
    if (!raw) {
      return {};
    }

    return JSON.parse(raw) as StoredNodePositions;
  } catch {
    return {};
  }
}

export function writeStoredNodePositions(
  projectId: string,
  nodes: Node[],
): void {
  if (typeof window === 'undefined') {
    return;
  }

  const positions: StoredNodePositions = {};
  for (const node of nodes) {
    positions[node.id] = { x: node.position.x, y: node.position.y };
  }

  try {
    window.localStorage.setItem(
      buildStorageKey(projectId),
      JSON.stringify(positions),
    );
  } catch {
    // Ignore storage write failures (e.g. quota exceeded).
  }
}
