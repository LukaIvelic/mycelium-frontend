'use client';

import { type FormEvent, useEffect, useState } from 'react';
import { useProjects } from '@/hooks/use-projects.hook';
import {
  type FormMessage,
  FormStatus,
  ReadOnlyNote,
  SaveResetActions,
  SettingsCard,
  TextareaField,
  TextField,
  WorkspaceEmptyState,
} from '../../form-controls';
import { useCanManageProject } from '../../use-can-manage-project';
import type { WorkspaceProjectSettingsProps } from '../../workspace-settings.types';

export function GeneralSettings({
  isLoading,
  selectedProject,
}: WorkspaceProjectSettingsProps) {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [message, setMessage] = useState<FormMessage | null>(null);
  const { useUpdateProject } = useProjects();
  const updateProject = useUpdateProject(selectedProject?.id ?? '');
  const { canManage } = useCanManageProject(selectedProject?.id);

  useEffect(() => {
    setName(selectedProject?.name ?? '');
    setDescription(selectedProject?.description ?? '');
    setMessage(null);
  }, [selectedProject]);

  if (!selectedProject) {
    return <WorkspaceEmptyState isLoading={isLoading} />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    const trimmedName = name.trim();
    if (!selectedProject || !trimmedName) {
      setMessage({ tone: 'error', text: 'Workspace name is required.' });
      return;
    }

    try {
      await updateProject.mutateAsync({
        name: trimmedName,
        description: description.trim(),
      });
      setMessage({ tone: 'success', text: 'Workspace saved.' });
    } catch {
      setMessage({ tone: 'error', text: 'Unable to save workspace.' });
    }
  }

  return (
    <form className='grid gap-6' onSubmit={handleSubmit}>
      <SettingsCard
        title='General'
        description='Name and description used across this workspace.'
        action={
          <SaveResetActions
            canManage={canManage}
            isPending={updateProject.isPending}
          />
        }
      >
        <div className='grid gap-4'>
          <TextField
            label='Name'
            value={name}
            placeholder='Workspace name'
            disabled={!canManage}
            onChange={setName}
          />
          <TextareaField
            label='Description'
            value={description}
            placeholder='Short workspace description'
            disabled={!canManage}
            onChange={setDescription}
          />
        </div>
        <FormStatus message={message} />
        <ReadOnlyNote canManage={canManage} />
      </SettingsCard>
    </form>
  );
}
