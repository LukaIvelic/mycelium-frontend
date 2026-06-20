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
