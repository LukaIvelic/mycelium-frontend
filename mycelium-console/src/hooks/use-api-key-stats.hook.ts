import { useQueries, useQuery } from '@tanstack/react-query';
import { ApiKeyStatsService } from '@/api/services/api-key-stats/api-key-stats-service';

const apiKeyStatsService = new ApiKeyStatsService();

const apiKeyStatsKeys = {
  all: ['api-key-stats'] as const,
  byApiKey: (apiKeyId: string) =>
    [...apiKeyStatsKeys.all, 'api-key', apiKeyId] as const,
};

function useApiKeyStatsByApiKeyId(apiKeyId: string | undefined) {
  return useQuery({
    queryKey: apiKeyStatsKeys.byApiKey(apiKeyId ?? ''),
    queryFn: () => apiKeyStatsService.findByApiKeyId(apiKeyId as string),
    enabled: Boolean(apiKeyId),
  });
}

function useApiKeyStatsByApiKeyIds(apiKeyIds: string[]) {
  return useQueries({
    queries: apiKeyIds.map((apiKeyId) => ({
      queryKey: apiKeyStatsKeys.byApiKey(apiKeyId),
      queryFn: () => apiKeyStatsService.findByApiKeyId(apiKeyId),
      enabled: Boolean(apiKeyId),
    })),
  });
}

export function useApiKeyStats() {
  return {
    useApiKeyStatsByApiKeyIds,
    useApiKeyStatsByApiKeyId,
  };
}
