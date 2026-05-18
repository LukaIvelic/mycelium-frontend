import type { ApiKey } from '@/lib/types/api-key';
import type { Project } from '@/lib/types/project';
import { type ApiClient, apiClient } from '../../api-client';

export class ApiKeyService {
  private apiClient: ApiClient = apiClient;

  async revoke(id: string) {
    return this.apiClient.delete(`/api-keys/${id}`);
  }

  async findMine() {
    return this.apiClient.get<ApiKey[]>('/api-keys');
  }

  async getProjectByApiKeyId(apiKeyId: string) {
    return this.apiClient.get<Project>('/projects/by-api-key', { apiKeyId });
  }
}
