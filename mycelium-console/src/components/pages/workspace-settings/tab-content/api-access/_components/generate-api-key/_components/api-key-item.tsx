'use client';

import dateFormat from 'dateformat';

import { Truncate } from '@/components/features/truncate';
import { useApiKeys } from '@/hooks/use-api-keys.hook';
import { useUserProfile } from '@/hooks/use-user-profile.hook';
import { cn } from '@/lib/utils';
import { API_KEY_PROJECT_NAME_MAX_LENGTH } from '../generate-api-key.config';
import { createApiKeyRevokeHandler } from '../generate-api-key.handlers';
import type { ApiKeyField, ApiKeyItemProps } from '../generate-api-key.types';
import { ApiKeyActions } from './api-key-actions';
import { ApiKeyFields } from './api-key-fields';

export function ApiKeyItem({ apiKey }: ApiKeyItemProps) {
  const { useMe } = useUserProfile();
  const { data: user } = useMe();
  const { useProjectByApiKeyId, useRevokeApiKey } = useApiKeys();
  const { data: project } = useProjectByApiKeyId(apiKey.id);

  const revokeApiKey = useRevokeApiKey();
  const handleApiKeyRevoke = createApiKeyRevokeHandler(apiKey.id, revokeApiKey);

  if (!user || !project) return null;

  const boundUsername = user.username;
  const createdAt = dateFormat(apiKey.createdAt);
  const truncatedProjectName = (
    <Truncate text={project.name} max={API_KEY_PROJECT_NAME_MAX_LENGTH} />
  );

  const fields: ApiKeyField[] = [
    { label: 'Name', value: apiKey.name },
    { label: 'Created at', value: createdAt },
    { label: 'For project', value: truncatedProjectName },
    { label: 'Bound to', value: `@${boundUsername}` },
  ];

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
