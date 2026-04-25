import { type ApiClient, apiClient } from '../../api-client';
import type { Service } from './services-service.types';

export class ServicesService {
  private apiClient: ApiClient = apiClient;

  async findById(id: string) {
    return this.apiClient.get<Service>(`/services/${id}`);
  }
}
