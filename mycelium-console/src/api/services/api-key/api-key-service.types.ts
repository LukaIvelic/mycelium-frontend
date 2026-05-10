import type { ApiKey } from '@/lib/types/api-key';

export type CreateApiKeyResponse = {
  key: string;
  message: string;
  entity: ApiKey;
};
