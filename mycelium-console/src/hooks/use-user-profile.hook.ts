import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UserProfileService } from '@/api/services/user-profile/user-profile-service';
import type {
  UpdateUserProfilePayload,
  UserAccessibilitySettingsPayload,
  UserNotificationSettingsPayload,
} from '@/api/services/user-profile/user-profile-service.types';

const userProfileService = new UserProfileService();

const userProfileKeys = {
  all: ['user-profiles'] as const,
  me: () => [...userProfileKeys.all, 'me'] as const,
  one: (id: string) => [...userProfileKeys.all, id] as const,
  notificationSettings: () =>
    [...userProfileKeys.me(), 'settings', 'notifications'] as const,
  accessibilitySettings: () =>
    [...userProfileKeys.me(), 'settings', 'accessibility'] as const,
};

function useMe() {
  return useQuery({
    queryKey: userProfileKeys.me(),
    queryFn: () => userProfileService.findMe(),
    staleTime: 5 * 60 * 1000,
  });
}

function useUserProfileById(id: string | undefined) {
  return useQuery({
    queryKey: userProfileKeys.one(id ?? ''),
    queryFn: () => userProfileService.findOne(id as string),
    enabled: Boolean(id),
  });
}

function useUpdateUserProfile(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateUserProfilePayload) =>
      userProfileService.update(id, payload),
    onSuccess: (updated) => {
      queryClient.setQueryData(userProfileKeys.one(id), updated);
      queryClient.setQueryData(userProfileKeys.me(), updated);
    },
  });
}

function useNotificationSettings() {
  return useQuery({
    queryKey: userProfileKeys.notificationSettings(),
    queryFn: () => userProfileService.findNotificationSettings(),
  });
}

function useUpdateNotificationSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UserNotificationSettingsPayload) =>
      userProfileService.updateNotificationSettings(payload),
    onSuccess: (updated) => {
      queryClient.setQueryData(userProfileKeys.notificationSettings(), updated);
    },
  });
}

function useResetNotificationSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => userProfileService.resetNotificationSettings(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userProfileKeys.notificationSettings(),
      });
    },
  });
}

function useAccessibilitySettings(enabled: boolean = true) {
  return useQuery({
    queryKey: userProfileKeys.accessibilitySettings(),
    queryFn: () => userProfileService.findAccessibilitySettings(),
    enabled,
  });
}

function useUpdateAccessibilitySettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UserAccessibilitySettingsPayload) =>
      userProfileService.updateAccessibilitySettings(payload),
    onSuccess: (updated) => {
      queryClient.setQueryData(
        userProfileKeys.accessibilitySettings(),
        updated,
      );
    },
  });
}

function useResetAccessibilitySettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => userProfileService.resetAccessibilitySettings(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userProfileKeys.accessibilitySettings(),
      });
    },
  });
}

export function useUserProfile() {
  return {
    useMe,
    useUserProfileById,
    useUpdateUserProfile,
    useNotificationSettings,
    useUpdateNotificationSettings,
    useResetNotificationSettings,
    useAccessibilitySettings,
    useUpdateAccessibilitySettings,
    useResetAccessibilitySettings,
  };
}
