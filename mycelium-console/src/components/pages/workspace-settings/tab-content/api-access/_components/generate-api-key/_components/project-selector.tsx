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
import type {
  ProjectComboboxItemProps,
  ProjectSelectorProps,
} from '../generate-api-key.types';

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
      itemToStringLabel={getProjectLabel}
      itemToStringValue={getProjectValue}
      isItemEqualToValue={isProjectEqualToValue}
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
        <ComboboxList>{renderProjectComboboxItem}</ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

function getProjectLabel(project: Project): string {
  return project.name;
}

function getProjectValue(project: Project): string {
  return project.id;
}

function isProjectEqualToValue(project: Project, value: Project): boolean {
  return project.id === value.id;
}

function renderProjectComboboxItem(project: Project) {
  return <ProjectComboboxItem key={project.id} project={project} />;
}

function ProjectComboboxItem({ project }: ProjectComboboxItemProps) {
  return (
    <ComboboxItem value={project}>
      <div className={cn('gap-1', 'flex flex-col')}>
        <span className={cn('line-clamp-2 break-all')}>{project.name}</span>
      </div>
    </ComboboxItem>
  );
}
