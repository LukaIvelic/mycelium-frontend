'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useProjects } from '@/hooks/use-projects.hook';
import { ProjectDeleteDialog } from '../project-delete-dialog';
import {
  createCloseDeleteDialogHandler,
  createDeleteProjectHandler,
  createOpenDeleteDialogHandler,
  createOpenProjectHandler,
} from '../projects-view.handlers';
import type { ProjectCardProps } from '../projects-view.types';
import { ProjectCardActions } from './project-card-actions';
import { ProjectCardButton } from './project-card-button';

export function ProjectCard({ project }: ProjectCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  const router = useRouter();
  const { useHasApiKey, useInvalidateProject } = useProjects();
  const hasActiveApiKey = useHasApiKey(project.id).data?.hasActiveApiKey;
  const invalidateProject = useInvalidateProject();
  const handleOpenProject = createOpenProjectHandler(router, project.id);
  const handleOpenDeleteDialog = createOpenDeleteDialogHandler(
    setIsDeleteDialogOpen,
  );
  const handleCloseDeleteDialog = createCloseDeleteDialogHandler(
    setIsDeleteDialogOpen,
  );
  const handleDelete = createDeleteProjectHandler(
    invalidateProject,
    project.id,
    setIsDeleteDialogOpen,
  );

  return (
    <>
      <div className='relative min-h-70'>
        <ProjectCardActions
          projectName={project.name}
          onOpenClick={handleOpenProject}
          onDeleteClick={handleOpenDeleteDialog}
        />
        <ProjectCardButton
          project={project}
          hasActiveApiKey={hasActiveApiKey}
          onClick={handleOpenProject}
        />
      </div>
      <ProjectDeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        projectName={project.name}
        onClose={handleCloseDeleteDialog}
        onDelete={handleDelete}
        isDeleting={invalidateProject.isPending}
      />
    </>
  );
}
