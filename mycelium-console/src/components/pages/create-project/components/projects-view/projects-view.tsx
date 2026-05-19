'use client';

import { useProjects } from '@/hooks/use-projects.hook';
import { useUsers } from '@/hooks/use-users.hook';
import { ProjectCard } from './project-card';

export function ProjectsView() {
  const { useAllProjectsByUserId } = useProjects();
  const { useMe } = useUsers();
  const { data: me } = useMe();
  const { data: projects = [] } = useAllProjectsByUserId(me?.id);

  return (
    <div className='grid grid-cols-3 grid-rows-4 gap-4 h-full w-full'>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
