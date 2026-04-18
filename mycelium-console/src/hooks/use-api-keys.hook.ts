import { ApiKeyService } from "@/api/services/api-key/api-key-service";

export function useApiKeys() {
  const apiKeyService = new ApiKeyService();

  const createApiKey = () => apiKeyService.create();
  const revokeApiKey = () => apiKeyService.revoke();

  return {
    createApiKey,
    revokeApiKey,
  };
}
