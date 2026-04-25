'use client';

import { Circle, KeyRound } from 'lucide-react';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Truncate } from '@/components/features/truncate';
import { useProjects } from '@/hooks/use-projects.hook';
import { useUsers } from '@/hooks/use-users.hook';
import type { Project } from '@/lib/types/project';
import { cn } from '@/lib/utils';

export function ProjectsView() {
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);

  const { useAllProjectsByUserId } = useProjects();
  const { useMe } = useUsers();
  const { data: me } = useMe();
  const { data } = useAllProjectsByUserId(me?.id);

  useEffect(() => {
    setProjects(data || []);
  }, [data]);

  return (
    <div className="grid grid-cols-3 grid-rows-4 gap-4 h-full w-full">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} router={router} />
      ))}
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
  router: AppRouterInstance;
}

function ProjectCard({ project, router }: ProjectCardProps) {
  const handleClick = () => router.push(`/projects/${project.id}`);
  const { useHasApiKey } = useProjects();
  const hasActiveApiKey = useHasApiKey(project.id).data?.hasActiveApiKey;

  return (
    <button
      type="button"
      className={cn(
        'border border-foreground/10 bg-[#232323] hover:cursor-pointer',
        'rounded-md min-w-full min-h-70 p-4',
        'flex flex-col gap-4 text-left',
        'transition duration-200 hover:brightness-120',
      )}
      onClick={handleClick}
    >
      <div className="w-full flex flex-col gap-px">
        <p className="text-base font-medium">{project.name}</p>
        <p className="text-sm text-foreground/50">
          <Truncate text={project.description || 'No description'} max={50} />
        </p>
      </div>
      <div
        className="w-full h-full bg-[#1D1D1D] border border-foreground/5 rounded-md relative"
        style={{
          backgroundImage:
            'radial-gradient(circle, color-mix(in srgb, var(--foreground) 8%, transparent) 1px, transparent 1px)',
          backgroundSize: '12px 12px',
        }}
      >
        <div className="text-xs flex flex-col gap-2 absolute bottom-4 left-4 text-foreground/80">
          <div className="flex gap-2 items-center">
            <KeyRound
              fill={hasActiveApiKey ? '#57E244' : 'orange'}
              stroke=""
              size={10}
            />
            Api key {!hasActiveApiKey && 'not '} generated
          </div>
          <div className="flex gap-2 items-center">
            <Circle fill="#57E244" stroke="" size={8} /> 4 services mapped
          </div>
        </div>
      </div>
    </button>
  );
}
