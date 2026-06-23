import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ServicesService } from '@/api/services/services/services-service';
import type {
  CreateServicePayload,
  ServiceCommunicationSettingsPayload,
  ServicePerformanceSettingsPayload,
  UpdateServicePayload,
} from '@/api/services/services/services-service.types';

const servicesService = new ServicesService();
type QueryBehaviorOptions = {
  staleTime?: number;
  refetchOnWindowFocus?: boolean;
  refetchOnReconnect?: boolean;
  refetchOnMount?: boolean;
};

const serviceKeys = {
  all: ['services'] as const,
  one: (id: string) => [...serviceKeys.all, id] as const,
  byProject: (projectId: string) =>
    [...serviceKeys.all, 'project', projectId] as const,
  performanceSettings: (id: string) =>
    [...serviceKeys.one(id), 'settings', 'performance'] as const,
  communicationSettings: (id: string) =>
    [...serviceKeys.one(id), 'settings', 'communication'] as const,
};

function findById(id: string) {
  return servicesService.findById(id);
}

function useFindById(id: string | null, options?: QueryBehaviorOptions) {
  return useQuery({
    queryKey: serviceKeys.one(id ?? ''),
    enabled: Boolean(id),
    queryFn: async () => {
      if (!id) {
        throw new Error('Service id is required');
      }

      const res = await servicesService.findById(id);
      return res;
    },
    ...options,
  });
}

function useFindByProjectId(
  projectId: string | undefined,
  options?: QueryBehaviorOptions,
) {
  return useQuery({
    queryKey: serviceKeys.byProject(projectId ?? ''),
    enabled: Boolean(projectId),
    queryFn: () => servicesService.findByProjectId(projectId as string),
    ...options,
  });
}

function useCreateService(projectId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Omit<CreateServicePayload, 'projectId'>) =>
      servicesService.create({ ...payload, projectId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.all });
      queryClient.invalidateQueries({ queryKey: ['react-flow'] });
    },
  });
}

function useUpdateService(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateServicePayload) =>
      servicesService.update(id, payload),
    onSuccess: (updated) => {
      queryClient.setQueryData(serviceKeys.one(id), updated);
      queryClient.invalidateQueries({ queryKey: serviceKeys.all });
      queryClient.invalidateQueries({ queryKey: ['react-flow'] });
    },
  });
}

function useDeleteService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => servicesService.delete(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: serviceKeys.one(id) });
      queryClient.invalidateQueries({ queryKey: serviceKeys.all });
      queryClient.invalidateQueries({ queryKey: ['react-flow'] });
    },
  });
}

function useServicePerformanceSettings(id: string | undefined) {
  return useQuery({
    queryKey: serviceKeys.performanceSettings(id ?? ''),
    queryFn: () => servicesService.findPerformanceSettings(id as string),
    enabled: Boolean(id),
  });
}

function useUpdateServicePerformanceSettings(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ServicePerformanceSettingsPayload) =>
      servicesService.updatePerformanceSettings(id, payload),
    onSuccess: (updated) => {
      queryClient.setQueryData(serviceKeys.performanceSettings(id), updated);
    },
  });
}

function useResetServicePerformanceSettings(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => servicesService.resetPerformanceSettings(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: serviceKeys.performanceSettings(id),
      });
    },
  });
}

function useServiceCommunicationSettings(id: string | undefined) {
  return useQuery({
    queryKey: serviceKeys.communicationSettings(id ?? ''),
    queryFn: () => servicesService.findCommunicationSettings(id as string),
    enabled: Boolean(id),
  });
}

function useUpdateServiceCommunicationSettings(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ServiceCommunicationSettingsPayload) =>
      servicesService.updateCommunicationSettings(id, payload),
    onSuccess: (updated) => {
      queryClient.setQueryData(serviceKeys.communicationSettings(id), updated);
    },
  });
}

function useResetServiceCommunicationSettings(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => servicesService.resetCommunicationSettings(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: serviceKeys.communicationSettings(id),
      });
    },
  });
}

export function useServices() {
  return {
    findById,
    useFindById,
    useFindByProjectId,
    useCreateService,
    useUpdateService,
    useDeleteService,
    useServicePerformanceSettings,
    useUpdateServicePerformanceSettings,
    useResetServicePerformanceSettings,
    useServiceCommunicationSettings,
    useUpdateServiceCommunicationSettings,
    useResetServiceCommunicationSettings,
  };
}
