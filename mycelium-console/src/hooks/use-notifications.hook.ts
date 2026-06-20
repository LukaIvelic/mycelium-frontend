import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { NotificationService } from '@/api/services/notification/notification-service';
import type { FindNotificationsParams } from '@/api/services/notification/notification-service.types';

const notificationService = new NotificationService();

const notificationKeys = {
  all: ['notifications'] as const,
  mine: (params?: FindNotificationsParams) =>
    [
      ...notificationKeys.all,
      'mine',
      params?.projectId ?? 'all-projects',
      params?.unreadOnly ?? 'all-read-states',
      params?.limit ?? 'default-limit',
    ] as const,
};

function useMyNotifications(params?: FindNotificationsParams) {
  return useQuery({
    queryKey: notificationKeys.mine(params),
    queryFn: () => notificationService.findMine(params),
  });
}

function useProjectNotifications(projectId: string | undefined, limit = 50) {
  return useMyNotifications({
    limit,
    projectId,
  });
}

function useMarkNotificationRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => notificationService.markRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
  });
}

function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (projectId?: string) =>
      notificationService.markAllRead({ projectId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
  });
}

export function useNotifications() {
  return {
    useMyNotifications,
    useProjectNotifications,
    useMarkNotificationRead,
    useMarkAllNotificationsRead,
  };
}
