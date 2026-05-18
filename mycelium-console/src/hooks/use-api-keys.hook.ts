import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { ApiKeyService } from '@/api/services/api-key/api-key-service';
import type { ApiKey } from '@/lib/types/api-key';

const apiKeyService = new ApiKeyService();

const apiKeyKeys = {
  all: ['api-keys'] as const,
  users: ['api-keys', 'user'] as const,
  byUser: (userId: string) => [...apiKeyKeys.all, 'user', userId] as const,
  project: (apiKeyId: string) =>
    [...apiKeyKeys.all, apiKeyId, 'project'] as const,
};
const projectKeys = ['projects'] as const;

function useApiKeysByUserId(userId: string | undefined) {
  return useQuery({
    queryKey: apiKeyKeys.byUser(userId ?? ''),
    queryFn: async () => {
      const apiKeys = await apiKeyService.findMine();
      return apiKeys.filter((apiKey) => !apiKey.revokedAt);
    },
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

function useRevokeApiKey() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiKeyService.revoke(id),
    onSuccess: (_, id) => {
      queryClient.setQueriesData(
        { queryKey: apiKeyKeys.users },
        (oldData: ApiKey[] | undefined) => {
          if (!oldData) return oldData;
          return oldData.filter((apiKey) => apiKey.id !== id);
        },
      );
      queryClient.invalidateQueries({ queryKey: apiKeyKeys.all });
      queryClient.invalidateQueries({ queryKey: projectKeys });
    },
  });
}

export function useApiKeys() {
  return {
    useApiKeysByUserId,
    useProjectByApiKeyId,
    useRevokeApiKey,
  };
}
