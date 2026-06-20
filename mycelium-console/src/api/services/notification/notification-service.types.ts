export type FindNotificationsParams = {
  limit?: number;
  projectId?: string;
  unreadOnly?: boolean;
};

export type MarkAllNotificationsReadPayload = {
  projectId?: string;
};
