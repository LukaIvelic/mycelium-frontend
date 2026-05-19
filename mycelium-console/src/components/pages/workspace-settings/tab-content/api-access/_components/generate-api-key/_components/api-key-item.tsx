'use client';

import dateFormat from 'dateformat';

import { Truncate } from '@/components/features/truncate';
import { useApiKeys } from '@/hooks/use-api-keys.hook';
import { useUsers } from '@/hooks/use-users.hook';
import { cn } from '@/lib/utils';
import {
  API_KEY_PROJECT_NAME_MAX_LENGTH,
  API_KEY_UNAVAILABLE_LABEL,
} from '../generate-api-key.config';
import { createApiKeyRevokeHandler } from '../generate-api-key.handlers';
import type { ApiKeyField, ApiKeyItemProps } from '../generate-api-key.types';
import { ApiKeyActions } from './api-key-actions';
import { ApiKeyFields } from './api-key-fields';

export function ApiKeyItem({ apiKey }: ApiKeyItemProps) {
  const { useMe } = useUsers();
  const { data: user } = useMe();

  const { useProjectByApiKeyId, useRevokeApiKey } = useApiKeys();
  const { data: project } = useProjectByApiKeyId(apiKey.id);
  const revokeApiKey = useRevokeApiKey();

  const createdAt = dateFormat(apiKey.createdAt);
  const projectName = project ? (
    <Truncate text={project.name} max={API_KEY_PROJECT_NAME_MAX_LENGTH} />
  ) : (
    API_KEY_UNAVAILABLE_LABEL
  );
  const boundEmail = user?.email ?? API_KEY_UNAVAILABLE_LABEL;
  const fields: ApiKeyField[] = [
    { label: 'Name', value: apiKey.name },
    { label: 'Created at', value: createdAt },
    { label: 'For project', value: projectName },
    { label: 'Bound to', value: boundEmail },
  ];
  const handleApiKeyRevoke = createApiKeyRevokeHandler(apiKey.id, revokeApiKey);

  return (
    <div
      className={cn(
        'h-14 p-2 pl-4',
        'grid grid-cols-[1fr_1fr_1fr_1fr_auto] grid-rows-2 items-center',
        'border border-foreground/10 rounded-md bg-background',
      )}
    >
      <ApiKeyActions onRevoke={handleApiKeyRevoke} />
      <ApiKeyFields fields={fields} />
    </div>
  );
}
