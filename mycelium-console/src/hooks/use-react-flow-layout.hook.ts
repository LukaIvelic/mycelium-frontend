import { useQuery } from '@tanstack/react-query';
import { ReactFlowService } from '@/api/services/react-flow/react-flow-service';

const reactFlowService = new ReactFlowService();

const reactFlowKeys = {
  all: ['react-flow'] as const,
  byProject: (projectId: string) => [...reactFlowKeys.all, projectId] as const,
};

function useFindByProjectId(projectId: string) {
  return useQuery({
    queryKey: reactFlowKeys.byProject(projectId),
    queryFn: async () => {
      const res = await reactFlowService.findByProjectId(projectId);
      return res;
    },
  });
}

export function useReactFlowLayout() {
  return {
    useFindByProjectId,
  };
}
