import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { ProjectService } from '@/api/services/project/project-service';
import type {
  AddApiKeyPayload,
  AddProjectMemberPayload,
  CreateProjectPayload,
  ProjectSortParams,
  UpdateProjectMemberPayload,
  UpdateProjectPayload,
} from '@/api/services/project/project-service.types';

const projectService = new ProjectService();

const projectKeys = {
  all: ['projects'] as const,
  one: (id: string) => [...projectKeys.all, id] as const,
  byUser: (
    userId: string,
    hasApiKey?: boolean,
    sortParams?: ProjectSortParams,
  ) =>
    [
      ...projectKeys.all,
      'user',
      userId,
      hasApiKey ?? 'all',
      sortParams?.field ?? 'default-field',
      sortParams?.sort ?? 'default-sort',
    ] as const,
  hasApiKey: (id: string) => [...projectKeys.one(id), 'has-api-key'] as const,
  members: (id: string) => [...projectKeys.one(id), 'members'] as const,
};

function useAllProjects() {
  return useQuery({
    queryKey: projectKeys.all,
    queryFn: () => projectService.findAll(),
  });
}

function useProject(id: string) {
  return useQuery({
    queryKey: projectKeys.one(id),
    queryFn: () => projectService.findOne(id),
    enabled: Boolean(id),
  });
}

function useProjectsByUserId(
  userId: string | undefined,
  hasApiKey?: boolean,
  sortParams?: ProjectSortParams,
) {
  return useQuery({
    queryKey: projectKeys.byUser(userId ?? '', hasApiKey, sortParams),
    queryFn: () =>
      projectService.findByUserId(userId as string, hasApiKey, sortParams),
    enabled: Boolean(userId),
  });
}

function useAllProjectsByUserId(
  userId: string | undefined,
  sortParams?: ProjectSortParams,
) {
  return useProjectsByUserId(userId, undefined, sortParams);
}

function useActiveProjectsByUserId(userId: string | undefined) {
  return useProjectsByUserId(userId, true);
}

function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateProjectPayload) =>
      projectService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
  });
}

function useUpdateProject(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateProjectPayload) =>
      projectService.update(id, payload),
    onSuccess: (updated) => {
      queryClient.setQueryData(projectKeys.one(id), updated);
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
  });
}

function useInvalidateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => projectService.invalidate(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: projectKeys.one(id) });
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
  });
}

function useHasApiKey(projectId: string) {
  return useQuery({
    queryKey: projectKeys.hasApiKey(projectId),
    queryFn: () => projectService.hasApiKey(projectId),
    enabled: Boolean(projectId),
  });
}

function useAddApiKey(projectId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: AddApiKeyPayload) =>
      projectService.addApiKey(projectId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['api-keys'] });
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
  });
}

function useProjectMembers(projectId: string | undefined) {
  return useQuery({
    queryKey: projectKeys.members(projectId ?? ''),
    queryFn: () => projectService.findMembers(projectId as string),
    enabled: Boolean(projectId),
  });
}

function useAddProjectMember(projectId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: AddProjectMemberPayload) =>
      projectService.addMember(projectId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: projectKeys.members(projectId),
      });
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
  });
}

function useUpdateProjectMember(projectId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      payload,
      userId,
    }: {
      payload: UpdateProjectMemberPayload;
      userId: string;
    }) => projectService.updateMember(projectId, userId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: projectKeys.members(projectId),
      });
    },
  });
}

function useRemoveProjectMember(projectId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) =>
      projectService.removeMember(projectId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: projectKeys.members(projectId),
      });
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
  });
}

export function useProjects() {
  return {
    useAllProjects,
    useProject,
    useProjectsByUserId,
    useAllProjectsByUserId,
    useActiveProjectsByUserId,
    useCreateProject,
    useUpdateProject,
    useInvalidateProject,
    useHasApiKey,
    useAddApiKey,
    useProjectMembers,
    useAddProjectMember,
    useUpdateProjectMember,
    useRemoveProjectMember,
  };
}
