'use client';

import dateFormat from 'dateformat';
import { AlertTriangle, Check, CheckCheck, Info, Timer } from 'lucide-react';
import { Truncate } from '@/components/features/truncate/truncate';
import { Button } from '@/components/ui/button/button';
import { Skeleton } from '@/components/ui/skeleton/skeleton';
import { useNotifications } from '@/hooks/use-notifications.hook';
import type {
  Notification,
  NotificationSeverity,
} from '@/lib/types/notification';
import { cn } from '@/lib/utils';
import {
  NOTIFICATIONS_LIMIT,
  NOTIFICATIONS_MAX_ITEMS,
  NOTIFICATIONS_PATH_TRUNCATE_MAX,
  NOTIFICATIONS_TIMESTAMP_FORMAT,
} from './notifications.config';
import type { NotificationsContentProps } from './notifications.types';

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
  const {
    useMarkAllNotificationsRead,
    useMarkNotificationRead,
    useProjectNotifications,
  } = useNotifications();
  const { data: notifications = [], isLoading } = useProjectNotifications(
    projectId,
    NOTIFICATIONS_LIMIT,
  );
  const markRead = useMarkNotificationRead();
  const markAllRead = useMarkAllNotificationsRead();
  const visibleNotifications = notifications.slice(0, NOTIFICATIONS_MAX_ITEMS);
  const unreadCount = visibleNotifications.filter(
    (notification) => notification.readAt === null,
  ).length;

  return (
    <div className='w-full h-full flex flex-col justify-start gap-2 overflow-auto no-scrollbar'>
      <div className='mb-1 flex items-center justify-between gap-2'>
        <span className='text-sm font-medium text-foreground/85'>
          Notifications
        </span>
        {unreadCount > 0 && (
          <Button
            variant='ghost'
            size='xs'
            className='text-foreground/55 hover:bg-white/5 hover:text-foreground'
            disabled={markAllRead.isPending}
            onClick={() => markAllRead.mutate(projectId)}
          >
            <CheckCheck className='size-3' />
            Mark all
          </Button>
        )}
      </div>

      {isLoading && <Skeleton className='h-20 w-full' />}

      {!isLoading && !visibleNotifications.length && (
        <div className='rounded-sm border border-[#434343] bg-[#1d1d1d] px-3 py-4 text-sm text-foreground/50'>
          No notifications.
        </div>
      )}

      {visibleNotifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onMarkRead={() => markRead.mutate(notification.id)}
          isMarkingRead={markRead.isPending}
        />
      ))}
    </div>
  );
}

function NotificationItem({
  isMarkingRead,
  notification,
  onMarkRead,
}: {
  isMarkingRead: boolean;
  notification: Notification;
  onMarkRead: () => void;
}) {
  const Icon = severityIcons[notification.severity];
  const isUnread = notification.readAt === null;

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
          {isUnread && <span className='size-1.5 rounded-full bg-primary' />}
        </div>
        <div className='flex shrink-0 items-center gap-1'>
          <span className='text-foreground/45'>
            {dateFormat(notification.createdAt, NOTIFICATIONS_TIMESTAMP_FORMAT)}
          </span>
          <Button
            variant='ghost'
            size='icon-xs'
            aria-label={`Mark ${notification.title} as read`}
            disabled={!isUnread || isMarkingRead}
            onClick={onMarkRead}
            className='size-5 text-foreground/40 hover:bg-white/5 hover:text-foreground'
          >
            <Check className='size-3' />
          </Button>
        </div>
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
