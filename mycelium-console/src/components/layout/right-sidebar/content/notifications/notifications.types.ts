export interface NotificationsContentProps {
  projectId: string;
}

export interface ProjectNotification {
  description: string;
  id: string;
  severity: NotificationSeverity;
  timestamp: string;
  title: string;
}

export type NotificationSeverity = 'critical' | 'info' | 'warning';
