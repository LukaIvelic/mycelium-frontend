import { apiClient, ApiClient } from "../../api-client";
import { ReactFlowLayout } from "./react-flow-service.types";

export class ReactFlowService {
  private apiClient: ApiClient = apiClient;

  async findByProjectId(projectId: string) {
    return this.apiClient.get<ReactFlowLayout>(`/react-flow/${projectId}`);
  }
}
