import type { ApiKey } from '@/lib/types/api-key';
import type {
  AssignableProjectMemberRole,
  ProjectMember,
} from '@/lib/types/project';

export enum ProjectSortDirection {
  Asc = 'ASC',
  Desc = 'DESC',
}

export enum ProjectSortField {
  Name = 'Name',
  RecentActivity = 'RecentActivity',
  RegistrationDate = 'RegistrationDate',
}

export interface ProjectSortParams {
  field: ProjectSortField;
  sort: ProjectSortDirection;
}

export type HeaderFilterLevel = 'HIGH' | 'MEDIUM' | 'METADATA' | 'ALL';

export type CreateProjectPayload = {
  name: string;
  description?: string;
};

export type UpdateProjectPayload = Partial<CreateProjectPayload>;

export type AddApiKeyPayload = {
  name?: string;
};

export type AddProjectMemberPayload = {
  email: string;
  role: AssignableProjectMemberRole;
};

export type UpdateProjectMemberPayload = {
  role: AssignableProjectMemberRole;
};

export type ProjectMemberResponse = ProjectMember;

export type AddApiKeyResponse = {
  key: string;
  message: string;
  entity: ApiKey;
};

export type HasApiKeyResponse = {
  hasActiveApiKey: boolean;
};

export type PerformanceSettingsPayload = {
  captureMetrics?: boolean;
  slowRequestThresholdMs?: number;
  notifyOnSlowRequests?: boolean;
  notifyOnFailedRequests?: boolean;
  warningStatusCode?: number;
  criticalStatusCode?: number;
};

export type PerformanceSettings = Required<PerformanceSettingsPayload> & {
  projectId?: string;
  integrationId?: string;
  createdAt: string | null;
  updatedAt: string | null;
};

export type CommunicationSettingsPayload = {
  subscribeToFetch?: boolean;
  subscribeToHttp?: boolean;
  captureBody?: boolean;
  bodyMaxBytes?: number;
  captureStreamBodies?: boolean;
  headerFilterLevel?: HeaderFilterLevel;
};

export type CommunicationSettings = Required<CommunicationSettingsPayload> & {
  projectId?: string;
  integrationId?: string;
  createdAt: string | null;
  updatedAt: string | null;
};

export type ProjectRegionSettingsPayload = {
  primaryRegion?: string;
  dataResidency?: string;
  failoverRegion?: string;
  timezone?: string;
  dateFormat?: string;
};

export type ProjectRegionSettings = Required<ProjectRegionSettingsPayload> & {
  projectId: string;
  createdAt: string | null;
  updatedAt: string | null;
};
