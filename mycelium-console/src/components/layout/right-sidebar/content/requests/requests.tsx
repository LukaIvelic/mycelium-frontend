'use client';

import dateFormat from 'dateformat';
import { Truncate } from '@/components/features/truncate/truncate';
import { Button } from '@/components/ui/button/button';
import { HoverCard } from '@/components/ui/hover-card/hover-card';
import { HoverCardContent } from '@/components/ui/hover-card/hover-card-content';
import { HoverCardTrigger } from '@/components/ui/hover-card/hover-card-trigger';
import { Kbd, KbdGroup } from '@/components/ui/kbd/kbd';
import { Skeleton } from '@/components/ui/skeleton/skeleton';
import { useLogs } from '@/hooks/use-logs.hook';
import { statusCodeColor } from '@/lib/status-code';
import { cn } from '@/lib/utils';
import {
  REQUESTS_LOG_LIMIT,
  REQUESTS_PATH_TRUNCATE_MAX,
  REQUESTS_TIMESTAMP_FORMAT,
} from './requests.config';
import type { RequestsContentProps } from './requests.types';

export function RequestsContent({ projectId }: RequestsContentProps) {
  const { useLogsByProject } = useLogs();
  const { data: projectLogs, isLoading } = useLogsByProject(projectId, {
    limit: REQUESTS_LOG_LIMIT,
  });
  const logs = projectLogs ?? [];

  return (
    <div className='w-full h-full flex flex-col justify-start gap-2 overflow-auto no-scrollbar'>
      {isLoading && <Skeleton className='h-20 w-full' />}
      {logs.map((log) => (
        <div
          key={log.id}
          className={cn(
            'border border-[#434343] bg-[#1d1d1d] py-3 px-2 rounded-sm',
            'flex flex-col gap-1',
          )}
        >
          <div className='text-xs flex justify-between'>
            <div>
              <span className={statusCodeColor(log.statusCode)}>
                {log.statusCode},
              </span>{' '}
              <span className='text-fuchsia-400'>
                <Truncate
                  text={`${log.method} ${log.path}`}
                  max={REQUESTS_PATH_TRUNCATE_MAX}
                />
              </span>
            </div>
            <span>{dateFormat(log.timestamp, REQUESTS_TIMESTAMP_FORMAT)}</span>
          </div>
          {log.parentSpanId === null && (
            <HoverCard>
              <HoverCardTrigger>
                <Button
                  variant='outline'
                  size='sm'
                  className='w-full mt-2 border-foreground/10 hover:cursor-pointer'
                >
                  Recreate
                </Button>
              </HoverCardTrigger>
              <HoverCardContent
                className='flex w-fit flex-col gap-0.5'
                side='top'
              >
                <KbdGroup className='[&_kbd]:bg-[#434343]'>
                  <Kbd>Alt</Kbd>
                  <span>+</span>
                  <Kbd>Shift</Kbd>
                  <span>+</span>
                  <Kbd>Y</Kbd>
                </KbdGroup>
              </HoverCardContent>
            </HoverCard>
          )}
        </div>
      ))}
    </div>
  );
}
