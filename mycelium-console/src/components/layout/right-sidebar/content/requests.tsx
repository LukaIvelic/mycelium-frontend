'use client';

import dateFormat from 'dateformat';
import { useEffect, useState } from 'react';
import { Truncate } from '@/components/features/truncate';
import { Button } from '@/components/ui/button';
import { useLogs } from '@/hooks/use-logs.hook';
import { statusCodeColor } from '@/lib/status-code';
import type { Log } from '@/lib/types/log';
import { cn } from '@/lib/utils';
import { Kbd, KbdGroup } from '@/components/ui/kbd';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

interface RequestContentProps {
  projectId: string;
}

export function RequestsContent({ projectId }: RequestContentProps) {
  const [logs, setLogs] = useState<Log[]>([]);

  const { useLogsByProject } = useLogs();
  const { data: projectLogs } = useLogsByProject(projectId, {
    limit: 20,
  });

  useEffect(() => {
    if (!projectLogs) return;
    setLogs(projectLogs);
  }, [projectLogs]);

  return (
    <div className="w-full h-full flex flex-col justify-start gap-2 overflow-auto no-scrollbar">
      {logs.map((log) => (
        <div
          key={log.id}
          className={cn(
            'border border-[#434343] bg-[#1d1d1d] py-3 px-2 rounded-sm',
            'flex flex-col gap-1',
          )}
        >
          <div className="text-xs flex justify-between">
            <div>
              <span className={statusCodeColor(log.statusCode)}>
                {log.statusCode},
              </span>{' '}
              <span className="text-fuchsia-400">
                <Truncate text={`${log.method} ${log.path}`} max={10} />
              </span>
            </div>
            <span>{dateFormat(log.timestamp, 'mm-dd, HH:MM')}</span>
          </div>
          {log.parentSpanId === null && (
            <HoverCard>
              <HoverCardTrigger>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2 border-foreground/10 hover:cursor-pointer"
                >
                  Recreate
                </Button>
              </HoverCardTrigger>
              <HoverCardContent
                className="flex w-fit flex-col gap-0.5"
                side="top"
              >
                <KbdGroup className="[&_kbd]:bg-[#434343]">
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
