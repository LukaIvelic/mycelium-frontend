import type {
  CommunicationSettings,
  CommunicationSettingsPayload,
  PerformanceSettings,
  PerformanceSettingsPayload,
} from '../project/project-service.types';

export type Service = {
  id: string;
  projectId: string;
  apiKeyId: string;
  origin: string;
  normalizedOrigin: string;
  key: string | null;
  name: string | null;
  version: string | null;
  description: string | null;
  repository: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateServicePayload = {
  projectId: string;
  origin: string;
  key?: string | null;
  name?: string | null;
  version?: string | null;
  description?: string | null;
  repository?: string | null;
};

export type UpdateServicePayload = Omit<
  Partial<CreateServicePayload>,
  'projectId'
>;

export type ServicePerformanceSettings = PerformanceSettings;
export type ServicePerformanceSettingsPayload = PerformanceSettingsPayload;
export type ServiceCommunicationSettings = CommunicationSettings;
export type ServiceCommunicationSettingsPayload = CommunicationSettingsPayload;
