import type { Project } from '@/lib/types/project';
import { type ApiClient, apiClient } from '../../api-client';
import type {
  AddApiKeyPayload,
  AddApiKeyResponse,
  AddProjectMemberPayload,
  CommunicationSettings,
  CommunicationSettingsPayload,
  CreateProjectPayload,
  HasApiKeyResponse,
  PerformanceSettings,
  PerformanceSettingsPayload,
  ProjectMemberResponse,
  ProjectRegionSettings,
  ProjectRegionSettingsPayload,
  ProjectSortParams,
  UpdateProjectMemberPayload,
  UpdateProjectPayload,
} from './project-service.types';

export class ProjectService {
  private apiClient: ApiClient = apiClient;

  async findAll() {
    return this.apiClient.get<Project[]>('/projects');
  }

  async findOne(id: string) {
    return this.apiClient.get<Project>(`/projects/${id}`);
  }

  async findByUserId(
    _user_id: string,
    hasApiKey?: boolean,
    sortParams?: ProjectSortParams,
  ) {
    const params = {
      ...(hasApiKey !== undefined && { hasApiKey }),
      ...sortParams,
    };

    return this.apiClient.get<Project[]>('/projects', params);
  }

  async create(payload: CreateProjectPayload) {
    return this.apiClient.post<Project>('/projects', payload);
  }

  async update(id: string, payload: UpdateProjectPayload) {
    return this.apiClient.patch<Project>(`/projects/${id}`, payload);
  }

  async invalidate(id: string) {
    return this.apiClient.delete<void>(`/projects/${id}`);
  }

  async addApiKey(id: string, payload: AddApiKeyPayload) {
    return this.apiClient.post<AddApiKeyResponse>(
      `/projects/${id}/api-key`,
      payload,
    );
  }

  async hasApiKey(id: string) {
    return this.apiClient.get<HasApiKeyResponse>(`/projects/${id}/has-api-key`);
  }

  async findMembers(id: string) {
    return this.apiClient.get<ProjectMemberResponse[]>(
      `/projects/${id}/members`,
    );
  }

  async addMember(id: string, payload: AddProjectMemberPayload) {
    return this.apiClient.post<ProjectMemberResponse>(
      `/projects/${id}/members`,
      payload,
    );
  }

  async updateMember(
    id: string,
    userId: string,
    payload: UpdateProjectMemberPayload,
  ) {
    return this.apiClient.patch<ProjectMemberResponse>(
      `/projects/${id}/members/${userId}`,
      payload,
    );
  }

  async removeMember(id: string, userId: string) {
    return this.apiClient.delete<void>(`/projects/${id}/members/${userId}`);
  }

  async findPerformanceSettings(id: string) {
    return this.apiClient.get<PerformanceSettings>(
      `/projects/${id}/settings/performance`,
    );
  }

  async updatePerformanceSettings(
    id: string,
    payload: PerformanceSettingsPayload,
  ) {
    return this.apiClient.patch<PerformanceSettings>(
      `/projects/${id}/settings/performance`,
      payload,
    );
  }

  async resetPerformanceSettings(id: string) {
    return this.apiClient.delete<void>(`/projects/${id}/settings/performance`);
  }

  async findCommunicationSettings(id: string) {
    return this.apiClient.get<CommunicationSettings>(
      `/projects/${id}/settings/communication`,
    );
  }

  async updateCommunicationSettings(
    id: string,
    payload: CommunicationSettingsPayload,
  ) {
    return this.apiClient.patch<CommunicationSettings>(
      `/projects/${id}/settings/communication`,
      payload,
    );
  }

  async resetCommunicationSettings(id: string) {
    return this.apiClient.delete<void>(
      `/projects/${id}/settings/communication`,
    );
  }

  async findRegionSettings(id: string) {
    return this.apiClient.get<ProjectRegionSettings>(
      `/projects/${id}/settings/region-localization`,
    );
  }

  async updateRegionSettings(
    id: string,
    payload: ProjectRegionSettingsPayload,
  ) {
    return this.apiClient.patch<ProjectRegionSettings>(
      `/projects/${id}/settings/region-localization`,
      payload,
    );
  }

  async resetRegionSettings(id: string) {
    return this.apiClient.delete<void>(
      `/projects/${id}/settings/region-localization`,
    );
  }
}
