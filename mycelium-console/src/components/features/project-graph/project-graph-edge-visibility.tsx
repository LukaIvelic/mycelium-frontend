'use client';

import { Switch } from '@/components/ui/switch/switch';
import { cn } from '@/lib/utils';
import { PROJECT_GRAPH_EDGE_VISIBILITY_LABEL } from './project-graph.config';
import type { ProjectGraphEdgeVisibilityProps } from './project-graph-edge-visibility.types';

export function ProjectGraphEdgeVisibility({
  onCheckedChange,
  showAllEdges,
}: ProjectGraphEdgeVisibilityProps) {
  return (
    <div
      className={cn(
        'absolute left-4 top-4 z-10',
        'flex items-center gap-3 rounded-md border border-foreground/10',
        'bg-background/90 px-3 py-2 backdrop-blur-sm',
      )}
    >
      <span className='text-sm text-foreground/70'>
        {PROJECT_GRAPH_EDGE_VISIBILITY_LABEL}
      </span>
      <Switch
        aria-label={PROJECT_GRAPH_EDGE_VISIBILITY_LABEL}
        checked={showAllEdges}
        onCheckedChange={onCheckedChange}
        className={cn(
          'data-checked:bg-foreground/90',
          'data-unchecked:bg-foreground/15',
        )}
      />
    </div>
  );
}
