'use client';

import dateFormat from 'dateformat';
import { AlertTriangle, Info, Timer } from 'lucide-react';
import { Truncate } from '@/components/features/truncate/truncate';
import { Skeleton } from '@/components/ui/skeleton/skeleton';
import { useLogs } from '@/hooks/use-logs.hook';
import type { Log } from '@/lib/types/log';
import { cn } from '@/lib/utils';
import {
  NOTIFICATIONS_LOG_LIMIT,
  NOTIFICATIONS_MAX_ITEMS,
  NOTIFICATIONS_PATH_TRUNCATE_MAX,
  NOTIFICATIONS_SLOW_REQUEST_MS,
  NOTIFICATIONS_TIMESTAMP_FORMAT,
} from './notifications.config';
import type {
  NotificationSeverity,
  NotificationsContentProps,
  ProjectNotification,
} from './notifications.types';

const severityStyles: Record<NotificationSeverity, string> = {
  critical: 'border-red-400/30 bg-red-500/10 text-red-300',
  info: 'border-sky-400/30 bg-sky-500/10 text-sky-300',
  warning: 'border-amber-400/30 bg-amber-500/10 text-amber-300',
};

const severityIcons = {
  critical: AlertTriangle,
  info: Info,
  warning: Timer,
};

export function NotificationsContent({ projectId }: NotificationsContentProps) {
  const { useLogsByProject } = useLogs();
  const { data: projectLogs, isLoading } = useLogsByProject(projectId, {
    limit: NOTIFICATIONS_LOG_LIMIT,
  });
  const notifications = createNotifications(projectLogs ?? []);

  return (
    <div className='w-full h-full flex flex-col justify-start gap-2 overflow-auto no-scrollbar'>
      {isLoading && <Skeleton className='h-20 w-full' />}

      {!isLoading && !notifications.length && (
        <div className='rounded-sm border border-[#434343] bg-[#1d1d1d] px-3 py-4 text-sm text-foreground/50'>
          No notifications.
        </div>
      )}

      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  );
}

function NotificationItem({
  notification,
}: {
  notification: ProjectNotification;
}) {
  const Icon = severityIcons[notification.severity];

  return (
    <div
      className={cn(
        'border border-[#434343] bg-[#1d1d1d] py-3 px-2 rounded-sm',
        'flex flex-col gap-1',
      )}
    >
      <div className='flex items-start justify-between gap-2 text-xs'>
        <div className='flex min-w-0 items-center gap-1.5'>
          <span
            className={cn(
              'grid size-5 shrink-0 place-items-center rounded-sm border',
              severityStyles[notification.severity],
            )}
          >
            <Icon size={13} />
          </span>
          <span className='font-medium text-foreground/85'>
            {notification.title}
          </span>
        </div>
        <span className='shrink-0 text-foreground/45'>
          {dateFormat(notification.timestamp, NOTIFICATIONS_TIMESTAMP_FORMAT)}
        </span>
      </div>

      <div className='pl-6 text-xs text-foreground/55'>
        <Truncate
          text={notification.description}
          max={NOTIFICATIONS_PATH_TRUNCATE_MAX}
        />
      </div>
    </div>
  );
}

function createNotifications(logs: Log[]): ProjectNotification[] {
  const notifications = logs.flatMap((log) => createLogNotifications(log));

  return notifications.slice(0, NOTIFICATIONS_MAX_ITEMS);
}

function createLogNotifications(log: Log): ProjectNotification[] {
  const notifications: ProjectNotification[] = [];
  const requestLabel = `${log.statusCode} ${log.method} ${log.path}`;

  if (log.statusCode >= 500) {
    notifications.push({
      description: requestLabel,
      id: `${log.id}:server-error`,
      severity: 'critical',
      timestamp: log.timestamp,
      title: 'Server error',
    });
  } else if (log.statusCode >= 400) {
    notifications.push({
      description: requestLabel,
      id: `${log.id}:client-error`,
      severity: 'warning',
      timestamp: log.timestamp,
      title: 'Request warning',
    });
  }

  if (log.durationMs >= NOTIFICATIONS_SLOW_REQUEST_MS) {
    notifications.push({
      description: `${log.durationMs} ms ${log.method} ${log.path}`,
      id: `${log.id}:slow-request`,
      severity: 'warning',
      timestamp: log.timestamp,
      title: 'Slow request',
    });
  }

  return notifications;
}
