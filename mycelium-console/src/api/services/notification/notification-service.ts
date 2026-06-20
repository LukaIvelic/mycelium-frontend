import type { Notification } from '@/lib/types/notification';
import { type ApiClient, apiClient } from '../../api-client';
import type {
  FindNotificationsParams,
  MarkAllNotificationsReadPayload,
} from './notification-service.types';

export class NotificationService {
  private apiClient: ApiClient = apiClient;

  async findMine(params?: FindNotificationsParams) {
    return this.apiClient.get<Notification[]>('/notifications', params);
  }

  async markRead(id: string) {
    return this.apiClient.patch<Notification>(`/notifications/${id}/read`, {});
  }

  async markAllRead(payload: MarkAllNotificationsReadPayload) {
    return this.apiClient.post<void>('/notifications/read-all', payload);
  }
}
