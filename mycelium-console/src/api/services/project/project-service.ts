import { apiClient, ApiClient } from "../../api-client";
import { Project } from "@/lib/types/project";
import { ApiKey } from "@/lib/types/api-key";
import {
  AddApiKeyPayload,
  AddApiKeyResponse,
  CreateProjectPayload,
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

  async findByUserId(user_id: string) {
    return this.apiClient.get<Project[]>(`/projects/user/${user_id}`);
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

  async getProjectsWithActiveApiKeys(user_id: string) {
    return this.apiClient.get<Project[]>(
      `/projects/active-projects/${user_id}`,
    );
  }

  async addApiKey(id: string, payload: AddApiKeyPayload) {
    return this.apiClient.post<AddApiKeyResponse>(`/projects/${id}/api-key`, payload);
  }
}
