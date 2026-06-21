'use client';

import { Switch } from '@/components/ui/switch/switch';
import { cn } from '@/lib/utils';
import { PROJECT_GRAPH_STRUCTURE_LABEL } from './project-graph.config';
import type { ProjectGraphStructureProps } from './project-graph-structure.types';

export function ProjectGraphStructure({
  onCheckedChange,
  applyStructure,
}: ProjectGraphStructureProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-md border border-foreground/10',
        'bg-background/90 px-3 py-2 backdrop-blur-sm',
      )}
    >
      <span className='text-sm text-foreground/70'>
        {PROJECT_GRAPH_STRUCTURE_LABEL}
      </span>
      <Switch
        aria-label={PROJECT_GRAPH_STRUCTURE_LABEL}
        checked={applyStructure}
        onCheckedChange={onCheckedChange}
        className={cn(
          'data-checked:bg-foreground/90',
          'data-unchecked:bg-foreground/15',
        )}
      />
    </div>
  );
}
