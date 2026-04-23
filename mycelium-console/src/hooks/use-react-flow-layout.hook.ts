import { ReactFlowService } from "@/api/services/react-flow/react-flow-service";

export function useReactFlowLayout() {
  const reactFlowService = new ReactFlowService();

  const findByProjectId = async (projectId: string) => {
    return reactFlowService.findByProjectId(projectId);
  };

  return {
    findByProjectId,
  };
}
