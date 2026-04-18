import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ProjectService } from "@/api/services/project/project-service";
import {
  AddApiKeyPayload,
  CreateProjectPayload,
  UpdateProjectPayload,
} from "@/api/services/project/project-service.types";

const projectService = new ProjectService();

const projectKeys = {
  all: ["projects"] as const,
  one: (id: string) => [...projectKeys.all, id] as const,
  byUser: (userId: string, hasApiKey?: boolean) =>
    [...projectKeys.all, "user", userId, hasApiKey ?? "all"] as const,
};

function useProject(id: string) {
  return useQuery({
    queryKey: projectKeys.one(id),
    queryFn: () => projectService.findOne(id),
    enabled: Boolean(id),
  });
}

function useProjectsByUserId(userId: string | undefined, hasApiKey?: boolean) {
  return useQuery({
    queryKey: projectKeys.byUser(userId ?? "", hasApiKey),
    queryFn: () => projectService.findByUserId(userId!, hasApiKey),
    enabled: Boolean(userId),
  });
}

function useActiveProjectsByUserId(userId: string | undefined) {
  return useProjectsByUserId(userId, true);
}

function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateProjectPayload) => projectService.create(payload),
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

function useAddApiKey(projectId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: AddApiKeyPayload) =>
      projectService.addApiKey(projectId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
    },
  });
}

export function useProjects() {
  return {
    useProject,
    useProjectsByUserId,
    useActiveProjectsByUserId,
    useCreateProject,
    useUpdateProject,
    useInvalidateProject,
    useAddApiKey,
  };
}
