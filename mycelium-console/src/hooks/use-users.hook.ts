import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UsersService } from '@/api/services/user/user-service';
import type {
  CreateUserPayload,
  UpdateUserPayload,
} from '@/api/services/user/user-service.types';

const usersService = new UsersService();

const userKeys = {
  all: ['users'] as const,
  me: () => [...userKeys.all, 'me'] as const,
  one: (id: string) => [...userKeys.all, id] as const,
  projects: (id: string) => [...userKeys.all, id, 'projects'] as const,
};

function useMe() {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: () => usersService.findMe(),
    staleTime: 5 * 60 * 1000,
  });
}

function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.one(id),
    queryFn: () => usersService.findOne(id),
    enabled: Boolean(id),
  });
}

function useUserProjects(id: string) {
  return useQuery({
    queryKey: userKeys.projects(id),
    queryFn: () => usersService.findProjectsById(id),
    enabled: Boolean(id),
  });
}

function useUserProjectsCount(id: string) {
  return useQuery({
    queryKey: userKeys.projects(id),
    queryFn: () => usersService.findProjectsById(id),
    enabled: Boolean(id),
    select: (projects) => projects.length,
  });
}

function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateUserPayload) => usersService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });
}

function useUpdateUser(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateUserPayload) =>
      usersService.update(id, payload),
    onSuccess: (updated) => {
      queryClient.setQueryData(userKeys.one(id), updated);
      queryClient.invalidateQueries({ queryKey: userKeys.me() });
    },
  });
}

function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => usersService.invalidate(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: userKeys.one(id) });
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });
}

export function useUsers() {
  return {
    useMe,
    useUser,
    useUserProjects,
    useUserProjectsCount,
    useCreateUser,
    useUpdateUser,
    useDeleteUser,
  };
}
