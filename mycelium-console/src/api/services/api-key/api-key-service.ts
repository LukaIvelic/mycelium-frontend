import type { ApiKey } from '@/lib/types/api-key';
import type { Project } from '@/lib/types/project';
import { type ApiClient, apiClient } from '../../api-client';
import type { CreateApiKeyResponse } from './api-key-service.types';

export class ApiKeyService {
  private apiClient: ApiClient = apiClient;

  async create(projectId: string) {
    return this.apiClient.post<CreateApiKeyResponse>(
      `/projects/${projectId}/api-key`,
      null,
    );
  }

  async revoke(id: string) {
    return this.apiClient.delete(`/api-keys/${id}`);
  }

  async findApiKeyByUserId(_userId: string) {
    return this.apiClient.get<ApiKey[]>('/api-keys');
  }

  async getProjectByApiKeyId(apiKeyId: string) {
    return this.apiClient.get<Project>('/projects/by-api-key', { apiKeyId });
  }
}
