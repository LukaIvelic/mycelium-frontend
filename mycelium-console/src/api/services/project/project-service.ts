import { apiClient, ApiClient } from "../../api-client";
import { Project } from "@/lib/types/project";
import {
  AddApiKeyPayload,
  AddApiKeyResponse,
  CreateProjectPayload,
  HasApiKeyResponse,
  UpdateProjectPayload,
} from "./project-service.types";

export class ProjectService {
  private apiClient: ApiClient = apiClient;

  async findAll() {
    return this.apiClient.get<Project[]>("/projects");
  }

  async findOne(id: string) {
    return this.apiClient.get<Project>(`/projects/${id}`);
  }

  async findByUserId(user_id: string, hasApiKey?: boolean) {
    const query = hasApiKey !== undefined ? `?hasApiKey=${hasApiKey}` : "";
    return this.apiClient.get<Project[]>(`/projects/user/${user_id}${query}`);
  }

  async create(payload: CreateProjectPayload) {
    return this.apiClient.post<Project>("/projects", payload);
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
}
