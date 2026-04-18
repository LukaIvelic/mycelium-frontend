import { ApiKey } from "@/lib/types/api-key";
import { apiClient, ApiClient } from "../../api-client";
import { CreateApiKeyResponse } from "./api-key-service.types";
import { Project } from "@/lib/types/project";

export class ApiKeyService {
  private apiClient: ApiClient = apiClient;

  async create(projectId: string) {
    return this.apiClient.post<CreateApiKeyResponse>(
      `/api-keys/${projectId}`,
      null,
    );
  }

  async revoke(id: string) {
    return this.apiClient.delete(`/api-keys/${id}`);
  }

  async findApiKeyByUserId(userId: string) {
    return this.apiClient.get<ApiKey[]>(`/api-keys/user/${userId}`);
  }

  async getProjectByApiKeyId(apiKeyId: string) {
    return this.apiClient.get<Project>(`/api-keys/${apiKeyId}/project`);
  }
}
