import { ApiKey } from "@/lib/types/api-key";

export type CreateProjectPayload = {
  name: string;
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
