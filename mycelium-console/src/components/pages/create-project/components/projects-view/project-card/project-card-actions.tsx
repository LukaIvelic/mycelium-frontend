import { MoreVertical } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import type { ProjectCardActionsProps } from '../projects-view.types';

export function ProjectCardActions({
  onDeleteClick,
  onOpenClick,
  projectName,
}: ProjectCardActionsProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        aria-label={`Project options for ${projectName}`}
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'icon-xs' }),
          'absolute top-4 right-4 z-10 text-foreground/45 hover:bg-white/5 hover:text-foreground',
        )}
      >
        <MoreVertical className='size-4' />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={onOpenClick}>Open</DropdownMenuItem>
        <DropdownMenuItem
          className='bg-destructive text-white data-highlighted:bg-destructive/90 data-highlighted:text-white'
          onClick={onDeleteClick}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
