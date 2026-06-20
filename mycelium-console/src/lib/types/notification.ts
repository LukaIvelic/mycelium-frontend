export type NotificationSeverity = 'critical' | 'info' | 'warning';

export type NotificationType =
  | 'project_deleted'
  | 'project_member_added'
  | 'project_member_removed'
  | 'project_member_role_updated'
  | 'request_warning'
  | 'server_error'
  | 'slow_request';

export type Notification = {
  createdAt: string;
  description: string;
  id: string;
  projectId: string | null;
  readAt: string | null;
  severity: NotificationSeverity;
  title: string;
  type: NotificationType;
  userId: string;
};
