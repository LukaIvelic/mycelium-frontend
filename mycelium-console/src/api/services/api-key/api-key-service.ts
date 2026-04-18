import { apiClient, ApiClient } from "../../api-client";
import { CreateApiKeyResponse } from "./api-key-service.types";

export class ApiKeyService {
    private apiClient: ApiClient = apiClient;

    async create(){
        return this.apiClient.post<CreateApiKeyResponse>('/api-keys', null);
    }

    async revoke(){
        return this.apiClient.delete('/api-keys');
    }
}