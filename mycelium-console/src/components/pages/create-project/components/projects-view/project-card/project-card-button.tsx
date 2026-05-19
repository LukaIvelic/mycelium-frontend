import { Truncate } from '@/components/features/truncate';
import { cn } from '@/lib/utils';
import type { ProjectCardButtonProps } from '../projects-view.types';
import {
  PROJECT_CARD_DESCRIPTION_MAX_LENGTH,
  PROJECT_CARD_NO_DESCRIPTION,
} from './project-card.config';
import { ProjectCardPreview } from './project-card-preview';

export function ProjectCardButton({
  project,
  hasActiveApiKey,
  onClick,
}: ProjectCardButtonProps) {
  return (
    <button
      type='button'
      className={cn(
        'border border-foreground/10 bg-[#232323] hover:cursor-pointer',
        'rounded-md min-w-full min-h-70 p-4',
        'flex h-full flex-col gap-4 text-left',
        'transition duration-200 hover:brightness-120',
      )}
      onClick={onClick}
    >
      <div className='w-full flex flex-col gap-px pr-8'>
        <p className='text-base font-medium'>{project.name}</p>
        <p className='text-sm text-foreground/50'>
          <Truncate
            text={project.description || PROJECT_CARD_NO_DESCRIPTION}
            max={PROJECT_CARD_DESCRIPTION_MAX_LENGTH}
          />
        </p>
      </div>
      <ProjectCardPreview hasActiveApiKey={hasActiveApiKey} />
    </button>
  );
}
