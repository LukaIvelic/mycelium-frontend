import { useQuery } from '@tanstack/react-query';
import { ServicesService } from '@/api/services/services/services-service';

const servicesService = new ServicesService();

const serviceKeys = {
  all: ['services'] as const,
  one: (id: string) => [...serviceKeys.all, id] as const,
};

function findById(id: string) {
  return servicesService.findById(id);
}

function useFindById(id: string) {
  return useQuery({
    queryKey: serviceKeys.one(id),
    queryFn: async () => {
      const res = await servicesService.findById(id);
      return res;
    },
  });
}

export function useServices() {
  return {
    findById,
    useFindById,
  };
}
