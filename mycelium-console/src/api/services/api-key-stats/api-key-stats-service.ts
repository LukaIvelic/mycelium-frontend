import type { ApiKeyStats } from '@/lib/types/api-key-stats';
import { type ApiClient, apiClient } from '../../api-client';

export class ApiKeyStatsService {
  private apiClient: ApiClient = apiClient;

  async findByApiKeyId(apiKeyId: string) {
    return this.apiClient.get<ApiKeyStats>(`/api-key-stats/${apiKeyId}`);
  }
}
