import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ApiKeyService } from "@/api/services/api-key/api-key-service";

const apiKeyService = new ApiKeyService();

const apiKeyKeys = {
  all: ["api-keys"] as const,
  byUser: (userId: string) => [...apiKeyKeys.all, "user", userId] as const,
  project: (apiKeyId: string) =>
    [...apiKeyKeys.all, apiKeyId, "project"] as const,
};

function useApiKeysByUserId(userId: string | undefined) {
  return useQuery({
    queryKey: apiKeyKeys.byUser(userId ?? ""),
    queryFn: () => apiKeyService.findApiKeyByUserId(userId!),
    enabled: Boolean(userId),
  });
}

function useProjectByApiKeyId(apiKeyId: string) {
  return useQuery({
    queryKey: apiKeyKeys.project(apiKeyId),
    queryFn: () => apiKeyService.getProjectByApiKeyId(apiKeyId),
    enabled: Boolean(apiKeyId),
  });
}

function useCreateApiKey() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiKeyService.create(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: apiKeyKeys.all });
    },
  });
}

function useRevokeApiKey() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiKeyService.revoke(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: apiKeyKeys.all });
    },
  });
}

export function useApiKeys() {
  return {
    useApiKeysByUserId,
    useProjectByApiKeyId,
    useCreateApiKey,
    useRevokeApiKey,
  };
}
