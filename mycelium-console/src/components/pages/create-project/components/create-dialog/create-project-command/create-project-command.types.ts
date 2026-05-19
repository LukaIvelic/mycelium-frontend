import type { ChangeEvent, Dispatch, SetStateAction } from 'react';

export interface CreateProjectCommandProps {
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

export interface CreateProjectFooterProps {
  canCreate: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export interface CreateProjectFormProps {
  description: string;
  onDescriptionChange: Dispatch<SetStateAction<string>>;
  onProjectNameChange: Dispatch<SetStateAction<string>>;
  projectName: string;
}

export interface CreateProjectSubmitHandlerParams {
  canCreate: boolean;
  createProject: {
    mutateAsync: (payload: {
      description?: string;
      name: string;
      userId?: string;
    }) => Promise<unknown>;
  };
  description: string;
  onOpenChange: (open: boolean) => void;
  projectName: string;
  reset: () => void;
  userId?: string;
}

export interface CreateProjectOpenChangeHandlerParams {
  onOpenChange: (open: boolean) => void;
  reset: () => void;
}

export type CreateProjectFieldChangeEvent = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;
