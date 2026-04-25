import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox';
import type { Project } from '@/lib/types/project';
import { cn } from '@/lib/utils';

interface ProjectSelectorProps {
  projects: Project[];
  value: Project | null;
  onValueChange: (project: Project | null) => void;
}

export function ProjectSelector({
  projects,
  value,
  onValueChange,
}: ProjectSelectorProps) {
  return (
    <Combobox<Project>
      items={projects}
      value={value}
      onValueChange={onValueChange}
      itemToStringLabel={(p) => p.name}
      itemToStringValue={(p) => p.id}
      isItemEqualToValue={(a, b) => a.id === b.id}
    >
      <ComboboxInput
        placeholder='Select a project'
        className={cn(
          'w-full',
          'rounded-sm border-foreground/10',
          'outline-none placeholder:text-foreground/50 has-[[data-slot=input-group-control]:focus-visible]:ring-0 has-[[data-slot=input-group-control]:focus-visible]:border-foreground/10',
        )}
      />
      <ComboboxContent>
        <ComboboxEmpty>No projects</ComboboxEmpty>
        <ComboboxList>
          {(project: Project) => (
            <ProjectComboboxItem key={project.id} project={project} />
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

function ProjectComboboxItem({ project }: { project: Project }) {
  return (
    <ComboboxItem value={project}>
      <div className={cn('gap-1', 'flex flex-col')}>
        <span className={cn('line-clamp-2 break-all')}>{project.name}</span>
        <span className={cn('text-foreground/50', 'text-xs')}>
          {project.user.email}
        </span>
      </div>
    </ComboboxItem>
  );
}
