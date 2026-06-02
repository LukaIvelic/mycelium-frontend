'use client';

import Link from 'next/link';
import { Separator } from '@/components/ui/separator/separator';
import { Skeleton } from '@/components/ui/skeleton/skeleton';
import { useApiKeyStats } from '@/hooks/use-api-key-stats.hook';
import { useApiKeys } from '@/hooks/use-api-keys.hook';
import { useUsers } from '@/hooks/use-users.hook';
import { cn } from '@/lib/utils';
import { API_USAGE_LEARN_MORE_ROUTE } from './api-usage.config';
import { createApiUsageItems } from './api-usage.helpers';
import type { ApiUsageItemProps } from './api-usage.types';

export function ApiUsage() {
  const { useMe } = useUsers();
  const { data: user, isLoading: isUserLoading } = useMe();
  const { useApiKeysByUserId } = useApiKeys();
  const { data: apiKeys = [], isLoading: areApiKeysLoading } =
    useApiKeysByUserId(user?.id);
  const { useApiKeyStatsByApiKeyIds } = useApiKeyStats();
  const apiKeyIds = apiKeys.map((apiKey) => apiKey.id);
  const apiKeyStatsResults = useApiKeyStatsByApiKeyIds(apiKeyIds);
  const areStatsLoading = apiKeyStatsResults.some(
    (result) => result.isLoading || result.isFetching || !result.data,
  );
  const isLoading =
    isUserLoading ||
    areApiKeysLoading ||
    (Boolean(apiKeyIds.length) && areStatsLoading);
  const apiKeyStats = apiKeyStatsResults.flatMap((result) =>
    result.data ? [result.data] : [],
  );
  const apiUsageItems = createApiUsageItems(apiKeyStats);

  return (
    <div
      className={cn(
        'w-full h-fit py-4 px-8',
        'bg-background border border-foreground/10 rounded-md',
        'grid grid-cols-4 grid-rows-[1fr_auto] gap-6',
      )}
    >
      {apiUsageItems.map((item) => (
        <ApiUsageItem
          key={item.title}
          title={item.title}
          value={item.value}
          isLoading={isLoading}
          includeSeparator={item.includeSeparator}
        />
      ))}
      <div className='col-span-4 row-2'>
        <p className='text-sm text-foreground/70'>
          These statistics show usage from 1st April 2026. We have a detailed
          overview of how we calculate it.&nbsp;
          <Link
            href={API_USAGE_LEARN_MORE_ROUTE}
            className='text-blue-400 hover:underline'
          >
            Learn more
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

function ApiUsageItem({
  title,
  value,
  isLoading,
  includeSeparator,
}: ApiUsageItemProps) {
  const showSkeleton =
    isLoading || value === null || value === undefined || value === '';

  return (
    <div className='h-full w-full flex flex-wrap justify-between'>
      <div className='flex flex-col items-start justify-center gap-1'>
        <p className='text-sm text-foreground/70 font-medium'>{title}</p>
        <div className='text-lg font-medium w-full h-8'>
          {showSkeleton ? (
            <Skeleton className='h-7 w-20 bg-foreground/15' />
          ) : (
            value
          )}
        </div>
      </div>
      {includeSeparator && (
        <Separator orientation='vertical' className='bg-foreground/10' />
      )}
    </div>
  );
}
