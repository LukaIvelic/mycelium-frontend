import { CREATE_PROJECT_EMPTY_FIELD } from './create-project-command.config';
import type {
  CreateProjectFieldChangeEvent,
  CreateProjectOpenChangeHandlerParams,
  CreateProjectSubmitHandlerParams,
} from './create-project-command.types';

export function createProjectResetHandler(
  setProjectName: (value: string) => void,
  setDescription: (value: string) => void,
) {
  return function reset(): void {
    setProjectName(CREATE_PROJECT_EMPTY_FIELD);
    setDescription(CREATE_PROJECT_EMPTY_FIELD);
  };
}

export function createProjectSubmitHandler({
  canCreate,
  createProject,
  description,
  onOpenChange,
  projectName,
  reset,
  userId,
}: CreateProjectSubmitHandlerParams) {
  return async function handleCreate(): Promise<void> {
    if (!canCreate || !userId) {
      return;
    }

    const name = projectName.trim();
    const trimmedDescription = description.trim();
    const payloadDescription = trimmedDescription || undefined;

    await createProject.mutateAsync({
      description: payloadDescription,
      name,
    });
    reset();
    onOpenChange(false);
  };
}

export function createProjectOpenChangeHandler({
  onOpenChange,
  reset,
}: CreateProjectOpenChangeHandlerParams) {
  return function handleOpenChange(nextOpen: boolean): void {
    if (!nextOpen) {
      reset();
    }

    onOpenChange(nextOpen);
  };
}

export function createProjectCloseHandler(
  handleOpenChange: (nextOpen: boolean) => void,
) {
  return function handleClose(): void {
    handleOpenChange(false);
  };
}

export function createProjectFieldChangeHandler(
  onChange: (value: string) => void,
) {
  return function handleFieldChange(
    event: CreateProjectFieldChangeEvent,
  ): void {
    onChange(event.target.value);
  };
}
