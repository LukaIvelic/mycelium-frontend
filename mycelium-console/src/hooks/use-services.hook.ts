import { useQuery } from '@tanstack/react-query';
import { ServicesService } from '@/api/services/services/services-service';

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

export function useServices() {
  return {
    findById,
    useFindById,
  };
}
