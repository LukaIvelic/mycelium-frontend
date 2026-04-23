import { ServicesService } from "@/api/services/services/services-service";

export function useServices() {
  const servicesService = new ServicesService();

  const findById = async (id: string) => {
    return servicesService.findById(id);
  };

  return {
    findById,
  };
}
