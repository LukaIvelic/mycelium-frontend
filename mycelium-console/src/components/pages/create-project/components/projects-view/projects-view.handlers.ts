import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import type { Dispatch, SetStateAction } from 'react';
import type { ProjectDeleteMutation } from './projects-view.types';

export function createOpenProjectHandler(
  router: AppRouterInstance,
  projectId: string,
) {
  return function handleOpenProject(): void {
    router.push(`/projects/${projectId}`);
  };
}

export function createOpenDeleteDialogHandler(
  setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>,
) {
  return function handleOpenDeleteDialog(): void {
    setIsDeleteDialogOpen(true);
  };
}

export function createCloseDeleteDialogHandler(
  setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>,
) {
  return function handleCloseDeleteDialog(): void {
    setIsDeleteDialogOpen(false);
  };
}

export function createDeleteProjectHandler(
  invalidateProject: ProjectDeleteMutation,
  projectId: string,
  setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>,
) {
  return function handleDeleteProject(): void {
    invalidateProject.mutate(projectId, {
      onSuccess: createCloseDeleteDialogHandler(setIsDeleteDialogOpen),
    });
  };
}
