import type { Dispatch, SetStateAction } from 'react';
import type { Project } from '@/lib/types/project';

export interface ProjectCardProps {
  project: Project;
}

export interface ProjectCardButtonProps extends ProjectCardProps {
  hasActiveApiKey?: boolean;
  onClick: () => void;
}

export interface ProjectCardPreviewProps {
  hasActiveApiKey?: boolean;
}

export interface ProjectCardActionsProps {
  onDeleteClick: () => void;
  onOpenClick: () => void;
  projectName: string;
}

export interface ProjectDeleteDialogProps {
  isDeleting: boolean;
  onClose: () => void;
  onDelete: () => void;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  projectName: string;
}

export interface ProjectDeleteMutation {
  mutate: (
    projectId: string,
    options: {
      onSuccess: () => void;
    },
  ) => void;
}
