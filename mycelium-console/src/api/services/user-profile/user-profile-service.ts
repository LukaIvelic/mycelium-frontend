import type { UserProfile } from '@/lib/types/user-profile';
import { type ApiClient, apiClient } from '../../api-client';
import type { UpdateUserProfilePayload } from './user-profile-service.types';

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
}
