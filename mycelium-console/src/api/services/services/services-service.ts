import { type ApiClient, apiClient } from '../../api-client';
import type {
  CreateServicePayload,
  Service,
  ServiceCommunicationSettings,
  ServiceCommunicationSettingsPayload,
  ServicePerformanceSettings,
  ServicePerformanceSettingsPayload,
  UpdateServicePayload,
} from './services-service.types';

export class ServicesService {
  private apiClient: ApiClient = apiClient;

  async findById(id: string) {
    return this.apiClient.get<Service>(`/integrations/${id}`);
  }

  async findByProjectId(projectId: string) {
    return this.apiClient.get<Service[]>('/integrations', { projectId });
  }

  async create(payload: CreateServicePayload) {
    return this.apiClient.post<Service>('/integrations', payload);
  }

  async update(id: string, payload: UpdateServicePayload) {
    return this.apiClient.patch<Service>(`/integrations/${id}`, payload);
  }

  async delete(id: string) {
    return this.apiClient.delete<void>(`/integrations/${id}`);
  }

  async findPerformanceSettings(id: string) {
    return this.apiClient.get<ServicePerformanceSettings>(
      `/integrations/${id}/settings/performance`,
    );
  }

  async updatePerformanceSettings(
    id: string,
    payload: ServicePerformanceSettingsPayload,
  ) {
    return this.apiClient.patch<ServicePerformanceSettings>(
      `/integrations/${id}/settings/performance`,
      payload,
    );
  }

  async resetPerformanceSettings(id: string) {
    return this.apiClient.delete<void>(
      `/integrations/${id}/settings/performance`,
    );
  }

  async findCommunicationSettings(id: string) {
    return this.apiClient.get<ServiceCommunicationSettings>(
      `/integrations/${id}/settings/communication`,
    );
  }

  async updateCommunicationSettings(
    id: string,
    payload: ServiceCommunicationSettingsPayload,
  ) {
    return this.apiClient.patch<ServiceCommunicationSettings>(
      `/integrations/${id}/settings/communication`,
      payload,
    );
  }

  async resetCommunicationSettings(id: string) {
    return this.apiClient.delete<void>(
      `/integrations/${id}/settings/communication`,
    );
  }
}
