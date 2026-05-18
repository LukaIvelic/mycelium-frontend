'use client';

import { Circle, KeyRound, MoreVertical } from 'lucide-react';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Truncate } from '@/components/features/truncate';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleClick = () => router.push(`/projects/${project.id}`);
  const { useHasApiKey, useInvalidateProject } = useProjects();
  const hasActiveApiKey = useHasApiKey(project.id).data?.hasActiveApiKey;
  const invalidateProject = useInvalidateProject();

  const handleDelete = () => {
    invalidateProject.mutate(project.id, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
      },
    });
  };

  return (
    <>
      <div className="relative min-h-70">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger
            aria-label={`Project options for ${project.name}`}
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'icon-xs' }),
              'absolute top-4 right-4 z-10 text-foreground/45 hover:bg-white/5 hover:text-foreground',
            )}
          >
            <MoreVertical className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleClick}>Open</DropdownMenuItem>
            <DropdownMenuItem
              className="bg-destructive text-white data-highlighted:bg-destructive/90 data-highlighted:text-white"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <button
          type="button"
          className={cn(
            'border border-foreground/10 bg-[#232323] hover:cursor-pointer',
            'rounded-md min-w-full min-h-70 p-4',
            'flex h-full flex-col gap-4 text-left',
            'transition duration-200 hover:brightness-120',
          )}
          onClick={handleClick}
        >
          <div className="w-full flex flex-col gap-px pr-8">
            <p className="text-base font-medium">{project.name}</p>
            <p className="text-sm text-foreground/50">
              <Truncate
                text={project.description || 'No description'}
                max={40}
              />
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
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Delete project?</DialogTitle>
            <DialogDescription>
              This will permanently delete {project.name}.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mx-0 mb-0 border-0 bg-transparent p-0 pt-2">
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="bg-destructive text-white hover:bg-destructive/90"
              disabled={invalidateProject.isPending}
              onClick={handleDelete}
            >
              {invalidateProject.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
