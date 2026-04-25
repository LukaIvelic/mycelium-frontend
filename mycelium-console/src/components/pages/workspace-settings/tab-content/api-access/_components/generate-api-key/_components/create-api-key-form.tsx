import { Button } from '@/components/ui/button';
import type { Project } from '@/lib/types/project';
import { cn } from '@/lib/utils';

import { ApiKeyNameInput } from './api-key-name-input';
import { ProjectSelector } from './project-selector';

interface CreateApiKeyFormProps {
  projects: Project[];
  selectedProject: Project | null;
  onSelectProject: (project: Project | null) => void;
  onApiKeyNameChange: (value: string) => void;
  handleGenerateApiKey: () => void;
  canGenerate: boolean;
}

export function CreateApiKeyForm({
  projects,
  selectedProject,
  onSelectProject,
  onApiKeyNameChange,
  handleGenerateApiKey,
  canGenerate,
}: CreateApiKeyFormProps) {
  return (
    <div
      className={cn(
        'w-full p-4 py-2 gap-2',
        'flex items-start justify-between',
      )}
    >
      <ApiKeyNameInput onChange={onApiKeyNameChange} />
      <ProjectSelector
        projects={projects}
        value={selectedProject}
        onValueChange={onSelectProject}
      />
      <Button
        size='default'
        disabled={!canGenerate}
        className={cn(
          'w-20',
          'rounded-sm',
          'hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
        )}
        onClick={handleGenerateApiKey}
      >
        Generate
      </Button>
    </div>
  );
}
