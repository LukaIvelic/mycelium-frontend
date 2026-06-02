'use client';

import { Skeleton } from '@/components/ui/skeleton/skeleton';
import { useProjects } from '@/hooks/use-projects.hook';
import { useUsers } from '@/hooks/use-users.hook';
import { ProjectCard } from './project-card/project-card';
import type { ProjectsViewProps } from './projects-view.types';

export function ProjectsView({ sortParams }: ProjectsViewProps) {
  const { useAllProjectsByUserId } = useProjects();
  const { useMe } = useUsers();
  const { data: me, isLoading: isUserLoading } = useMe();
  const { data: projects = [], isLoading: areProjectsLoading } =
    useAllProjectsByUserId(me?.id, sortParams);
  const isLoading = isUserLoading || areProjectsLoading;

  return (
    <div className='grid grid-cols-3 grid-rows-4 gap-4 h-full w-full'>
      {isLoading && <Skeleton className='min-h-70 w-full' />}
      {!isLoading &&
        projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
    </div>
  );
}
