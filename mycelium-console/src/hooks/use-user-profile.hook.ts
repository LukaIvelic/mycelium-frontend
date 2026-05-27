import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UserProfileService } from '@/api/services/user-profile/user-profile-service';
import type { UpdateUserProfilePayload } from '@/api/services/user-profile/user-profile-service.types';

const userProfileService = new UserProfileService();

const userProfileKeys = {
  all: ['user-profiles'] as const,
  me: () => [...userProfileKeys.all, 'me'] as const,
  one: (id: string) => [...userProfileKeys.all, id] as const,
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

export function useUserProfile() {
  return {
    useMe,
    useUserProfileById,
    useUpdateUserProfile,
  };
}
