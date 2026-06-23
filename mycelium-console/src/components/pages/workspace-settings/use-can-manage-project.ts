import { useProjects } from '@/hooks/use-projects.hook';
import { useUsers } from '@/hooks/use-users.hook';

export function useCanManageProject(projectId: string | undefined) {
  const { useMe } = useUsers();
  const { useProjectMembers } = useProjects();
  const { data: user } = useMe();
  const { data: members = [], isLoading } = useProjectMembers(projectId);
  const currentMember = members.find((member) => member.userId === user?.id);
  const canManage =
    currentMember?.role === 'owner' || currentMember?.role === 'admin';

  return { canManage, isLoading };
}
