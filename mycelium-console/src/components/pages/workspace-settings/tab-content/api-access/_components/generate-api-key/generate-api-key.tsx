'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button/button';
import { Skeleton } from '@/components/ui/skeleton/skeleton';
import { useApiKeys } from '@/hooks/use-api-keys.hook';
import { useUsers } from '@/hooks/use-users.hook';
import { cn } from '@/lib/utils';

import { ApiKeyItem } from './_components/api-key-item';
import { CreateApiKeyCommand } from './_components/create-api-key-command';
import { API_KEY_EMPTY_LIST_LENGTH } from './generate-api-key.config';
import { createOpenApiKeyDialogHandler } from './generate-api-key.handlers';

export function GenerateApiKey() {
  const [createOpen, setCreateOpen] = useState<boolean>(false);

  const { useMe } = useUsers();
  const { data: user, isLoading: isUserLoading } = useMe();
  const { useApiKeysByUserId } = useApiKeys();
  const { data: apiKeys = [], isLoading: areApiKeysLoading } =
    useApiKeysByUserId(user?.id);
  const isLoading = isUserLoading || areApiKeysLoading;
  const hasApiKeys = apiKeys.length > API_KEY_EMPTY_LIST_LENGTH;
  const handleOpenApiKeyDialog = createOpenApiKeyDialogHandler(setCreateOpen);

  return (
    <div className={cn('gap-10', 'grid grid-rows-[1fr_auto]')}>
      <div className={cn('h-10', 'row-1 flex items-center justify-between')}>
        <div>
          <p>Generate API Key Component</p>
          <p className={cn('text-foreground/50', 'text-sm')}>
            You can only have 3 active API keys for your workspace.
          </p>
        </div>
        <Button
          size='sm'
          className={cn('hover:cursor-pointer')}
          onClick={handleOpenApiKeyDialog}
        >
          Create New Key
        </Button>
        <CreateApiKeyCommand open={createOpen} onOpenChange={setCreateOpen} />
      </div>

      <div className={cn('h-[50vh]', 'row-2')}>
        {isLoading && <Skeleton className='h-14 w-full' />}
        {!isLoading && !hasApiKeys ? (
          <div
            className={cn(
              'w-full h-full pt-4',
              'flex place-content-center',
              'text-foreground/20',
              'text-sm',
            )}
          >
            No projects with active API keys found.
          </div>
        ) : null}
        {!isLoading && hasApiKeys && (
          <div className='flex flex-col gap-2'>
            {apiKeys.map((apiKey) => (
              <ApiKeyItem key={apiKey.id} apiKey={apiKey} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
