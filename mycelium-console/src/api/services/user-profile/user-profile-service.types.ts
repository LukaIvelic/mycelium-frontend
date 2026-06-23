export type UpdateUserProfilePayload = {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  bio?: string;
  jobTitle?: string;
  company?: string;
  location?: string;
  avatarUrl?: string;
};

export type UserNotificationSettingsPayload = {
  productUpdates?: boolean;
  workspaceActivity?: boolean;
  securityNotices?: boolean;
  dailyDigestTime?: string;
  weeklyReportDay?: string;
  quietHoursStart?: string;
  quietHoursEnd?: string;
};

export type UserNotificationSettings =
  Required<UserNotificationSettingsPayload> & {
    userId: string;
    createdAt: string | null;
    updatedAt: string | null;
  };

export type UserAccessibilitySettingsPayload = {
  reducedMotion?: boolean;
  contrastPreference?: string;
  focusIndicators?: boolean;
  textDensity?: string;
  screenReaderLabels?: boolean;
  keyboardShortcuts?: boolean;
};

export type UserAccessibilitySettings =
  Required<UserAccessibilitySettingsPayload> & {
    userId: string;
    createdAt: string | null;
    updatedAt: string | null;
  };
