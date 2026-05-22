import type { ApiKey } from '@/lib/types/api-key';

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

export type AddApiKeyResponse = {
  key: string;
  message: string;
  entity: ApiKey;
};

export type HasApiKeyResponse = {
  hasActiveApiKey: boolean;
};
