'use client';

import { useState } from 'react';

import { Command, CommandDialog } from '@/components/ui/command/command';
import { useProjects } from '@/hooks/use-projects.hook';
import { useUsers } from '@/hooks/use-users.hook';
import { cn } from '@/lib/utils';

import { CreateProjectFooter } from './_components/create-project-footer';
import { CreateProjectForm } from './_components/create-project-form';
import { CreateProjectHeader } from './_components/create-project-header';
import { CREATE_PROJECT_EMPTY_FIELD } from './create-project-command.config';
import {
  createProjectCloseHandler,
  createProjectOpenChangeHandler,
  createProjectResetHandler,
  createProjectSubmitHandler,
} from './create-project-command.handlers';
import type { CreateProjectCommandProps } from './create-project-command.types';

export function CreateProjectCommand({
  open,
  onOpenChange,
}: CreateProjectCommandProps) {
  const [projectName, setProjectName] = useState<string>(
    CREATE_PROJECT_EMPTY_FIELD,
  );
  const [description, setDescription] = useState<string>(
    CREATE_PROJECT_EMPTY_FIELD,
  );

  const { useMe } = useUsers();
  const { data: user } = useMe();

  const { useCreateProject } = useProjects();
  const createProject = useCreateProject();

  const canCreate =
    projectName.trim().length > 0 &&
    !createProject.isPending &&
    Boolean(user?.id);

  const reset = createProjectResetHandler(setProjectName, setDescription);
  const handleCreate = createProjectSubmitHandler({
    canCreate,
    createProject,
    description,
    onOpenChange,
    projectName,
    reset,
    userId: user?.id,
  });
  const handleOpenChange = createProjectOpenChangeHandler({
    onOpenChange,
    reset,
  });
  const handleClose = createProjectCloseHandler(handleOpenChange);

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
          onClose={handleClose}
          onSubmit={handleCreate}
          canCreate={canCreate}
        />
      </Command>
    </CommandDialog>
  );
}
