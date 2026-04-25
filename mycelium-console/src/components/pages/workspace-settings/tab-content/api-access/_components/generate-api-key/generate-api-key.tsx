'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { useApiKeys } from '@/hooks/use-api-keys.hook';
import { useUsers } from '@/hooks/use-users.hook';
import { cn } from '@/lib/utils';

import { ApiKeyItem } from './_components/api-key-item';
import { CreateApiKeyCommand } from './_components/create-api-key-command';

export function GenerateApiKey() {
  const [createOpen, setCreateOpen] = useState(false);

  const { useMe } = useUsers();
  const { data: user } = useMe();
  const { useApiKeysByUserId } = useApiKeys();
  const { data: apiKeys = [] } = useApiKeysByUserId(user?.id);

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
          size="sm"
          className={cn('hover:cursor-pointer')}
          onClick={() => setCreateOpen(true)}
        >
          Create New Key
        </Button>
        <CreateApiKeyCommand open={createOpen} onOpenChange={setCreateOpen} />
      </div>

      <div className={cn('h-[50vh]', 'row-2')}>
        {apiKeys.length === 0 ? (
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
        ) : (
          <div className="flex flex-col gap-2">
            {apiKeys.map((apiKey) => (
              <ApiKeyItem key={apiKey.id} apiKey={apiKey} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
