'use client';

import { useState } from 'react';

import { Command, CommandDialog } from '@/components/ui/command';
import { useProjects } from '@/hooks/use-projects.hook';
import { useUsers } from '@/hooks/use-users.hook';
import { cn } from '@/lib/utils';

import { CreateProjectFooter } from './_components/create-project-footer';
import { CreateProjectForm } from './_components/create-project-form';
import { CreateProjectHeader } from './_components/create-project-header';

interface CreateProjectCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateProjectCommand({
  open,
  onOpenChange,
}: CreateProjectCommandProps) {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');

  const { useMe } = useUsers();
  const { data: user } = useMe();

  const { useCreateProject } = useProjects();
  const createProject = useCreateProject();

  const canCreate =
    projectName.trim().length > 0 &&
    !createProject.isPending &&
    Boolean(user?.id);

  const handleCreate = async () => {
    if (!canCreate || !user?.id) return;
    await createProject.mutateAsync({
      name: projectName.trim(),
      description: description.trim() || undefined,
      user_id: user.id,
    });
    reset();
    onOpenChange(false);
  };

  const reset = () => {
    setProjectName('');
    setDescription('');
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={handleOpenChange}
      title='Create Project'
      description='Enter a name for your new project.'
      className={cn('sm:max-w-xl h-fit', 'left-[calc(50%+8rem)]')}
    >
      <Command>
        <CreateProjectHeader />
        <CreateProjectForm
          projectName={projectName}
          description={description}
          onProjectNameChange={setProjectName}
          onDescriptionChange={setDescription}
        />
        <CreateProjectFooter
          onClose={() => handleOpenChange(false)}
          onSubmit={handleCreate}
          canCreate={canCreate}
        />
      </Command>
    </CommandDialog>
  );
}
