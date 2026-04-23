import { apiClient, ApiClient } from "../../api-client";
import { Service } from "./services-service.types";

export class ServicesService {
  private apiClient: ApiClient = apiClient;

  async findById(id: string) {
    return this.apiClient.get<Service>(`/services/${id}`);
  }
}
