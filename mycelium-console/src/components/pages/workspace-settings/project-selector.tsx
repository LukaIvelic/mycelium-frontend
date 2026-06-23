import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox/combobox';
import type { Project } from '@/lib/types/project';
import { cn } from '@/lib/utils';

interface WorkspaceProjectSelectorProps {
  className?: string;
  onValueChange: (project: Project | null) => void;
  projects: Project[];
  value: Project | null;
}

export function WorkspaceProjectSelector({
  className,
  onValueChange,
  projects,
  value,
}: WorkspaceProjectSelectorProps) {
  return (
    <Combobox<Project>
      items={projects}
      value={value}
      onValueChange={onValueChange}
      itemToStringLabel={(project) => project.name}
      itemToStringValue={(project) => project.id}
      isItemEqualToValue={(project, selected) => project.id === selected.id}
    >
      <ComboboxInput
        placeholder='Workspace'
        className={cn(
          'w-full rounded-md border-foreground/10 bg-[#1d1d1d]',
          'outline-none placeholder:text-foreground/50 has-[[data-slot=input-group-control]:focus-visible]:ring-0 has-[[data-slot=input-group-control]:focus-visible]:border-foreground/10',
          className,
        )}
      />
      <ComboboxContent>
        <ComboboxEmpty>No workspaces</ComboboxEmpty>
        <ComboboxList>
          {(project) => (
            <ComboboxItem key={project.id} value={project}>
              <span className='line-clamp-2 break-all'>{project.name}</span>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
