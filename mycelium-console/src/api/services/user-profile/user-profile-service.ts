import type { UserProfile } from '@/lib/types/user-profile';
import { type ApiClient, apiClient } from '../../api-client';
import type {
  UpdateUserProfilePayload,
  UserAccessibilitySettings,
  UserAccessibilitySettingsPayload,
  UserNotificationSettings,
  UserNotificationSettingsPayload,
} from './user-profile-service.types';

export class UserProfileService {
  private apiClient: ApiClient = apiClient;

  async findMe() {
    return this.apiClient.get<UserProfile>('/user-profiles/me');
  }

  async findOne(id: string) {
    return this.apiClient.get<UserProfile>(`/user-profiles/${id}`);
  }

  async update(id: string, payload: UpdateUserProfilePayload) {
    return this.apiClient.patch<UserProfile>(`/user-profiles/${id}`, payload);
  }

  async findNotificationSettings() {
    return this.apiClient.get<UserNotificationSettings>(
      '/user-profiles/me/settings/notifications',
    );
  }

  async updateNotificationSettings(payload: UserNotificationSettingsPayload) {
    return this.apiClient.patch<UserNotificationSettings>(
      '/user-profiles/me/settings/notifications',
      payload,
    );
  }

  async resetNotificationSettings() {
    return this.apiClient.delete<void>(
      '/user-profiles/me/settings/notifications',
    );
  }

  async findAccessibilitySettings() {
    return this.apiClient.get<UserAccessibilitySettings>(
      '/user-profiles/me/settings/accessibility',
    );
  }

  async updateAccessibilitySettings(payload: UserAccessibilitySettingsPayload) {
    return this.apiClient.patch<UserAccessibilitySettings>(
      '/user-profiles/me/settings/accessibility',
      payload,
    );
  }

  async resetAccessibilitySettings() {
    return this.apiClient.delete<void>(
      '/user-profiles/me/settings/accessibility',
    );
  }
}
