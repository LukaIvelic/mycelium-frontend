import type { Log, LogDetail } from '@/lib/types/log';
import { type ApiClient, apiClient } from '../../api-client';
import type { FindLogsQuery } from './log-service.types';

export class LogService {
  private apiClient: ApiClient = apiClient;

  async findByProject(projectId: string, query?: FindLogsQuery) {
    return this.apiClient.get<Log[]>('/logs', { projectId, ...query });
  }

  async findByIntegration(integrationId: string, query?: FindLogsQuery) {
    return this.apiClient.get<Log[]>(
      `/logs/integration/${integrationId}`,
      query,
    );
  }

  async findDetail(_projectId: string, logId: string) {
    return this.apiClient.get<LogDetail>(`/log-details/${logId}`);
  }
}
