import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { CREATE_PROJECT_DESCRIPTION_ROWS } from '../create-project-command.config';
import { createProjectFieldChangeHandler } from '../create-project-command.handlers';
import type { CreateProjectFormProps } from '../create-project-command.types';

export function CreateProjectForm({
  projectName,
  description,
  onProjectNameChange,
  onDescriptionChange,
}: CreateProjectFormProps) {
  const handleProjectNameChange =
    createProjectFieldChangeHandler(onProjectNameChange);
  const handleDescriptionChange =
    createProjectFieldChangeHandler(onDescriptionChange);

  return (
    <div className={cn('w-full p-4 py-2 gap-3', 'flex flex-col')}>
      <Input
        placeholder='Project name'
        value={projectName}
        onChange={handleProjectNameChange}
        className={cn(
          'rounded-sm border-foreground/10',
          'outline-none focus-visible:ring-0 placeholder:text-foreground/50',
        )}
      />
      <Textarea
        placeholder='Description (optional)'
        value={description}
        onChange={handleDescriptionChange}
        className={cn(
          'rounded-sm border-foreground/10 resize-none',
          'outline-none focus-visible:ring-0 placeholder:text-foreground/50',
        )}
        rows={CREATE_PROJECT_DESCRIPTION_ROWS}
      />
    </div>
  );
}
