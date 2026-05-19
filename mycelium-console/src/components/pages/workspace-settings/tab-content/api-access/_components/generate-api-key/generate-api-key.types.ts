import type { ChangeEvent, Dispatch, ReactNode, SetStateAction } from 'react';
import type { ApiKey } from '@/lib/types/api-key';
import type { Project } from '@/lib/types/project';

export interface ApiKeyCopyFieldProps {
  apiKey: string;
}

export interface ApiKeyItemProps {
  apiKey: ApiKey;
}

export interface ApiKeyField {
  label: string;
  value: ReactNode;
}

export interface ApiKeyActionsProps {
  onRevoke: () => void;
}

export interface ApiKeyFieldsProps {
  fields: ApiKeyField[];
}

export interface ApiKeyNameInputProps {
  onChange: (value: string) => void;
}

export interface CreateApiKeyCommandProps {
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

export interface CreateApiKeyFooterProps {
  onClose: () => void;
}

export interface CreateApiKeyFormProps {
  canGenerate: boolean;
  handleGenerateApiKey: () => void;
  onApiKeyNameChange: Dispatch<SetStateAction<string | null>>;
  onSelectProject: Dispatch<SetStateAction<Project | null>>;
  projects: Project[];
  selectedProject: Project | null;
}

export interface GeneratedApiKeyDisplayProps {
  apiKey: string;
}

export interface ProjectSelectorProps {
  onValueChange: (project: Project | null) => void;
  projects: Project[];
  value: Project | null;
}

export interface ProjectComboboxItemProps {
  project: Project;
}

export interface CreateApiKeyGenerateHandlerParams {
  addApiKey: {
    mutateAsync: (payload: { name?: string }) => Promise<{ key: string }>;
  };
  apiKeyName: string | null;
  canGenerate: boolean;
  setGeneratedKey: Dispatch<SetStateAction<string | null>>;
}

export interface CreateApiKeyOpenChangeHandlerParams {
  onOpenChange: (open: boolean) => void;
  reset: () => void;
}

export interface CreateApiKeyEventDetails {
  cancel?: () => void;
  reason?: string;
}

export type ApiKeyNameChangeEvent = ChangeEvent<HTMLInputElement>;
