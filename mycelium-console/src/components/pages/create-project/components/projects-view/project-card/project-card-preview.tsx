import { Circle, KeyRound } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton/skeleton';
import type { ProjectCardPreviewProps } from '../projects-view.types';
import {
  PROJECT_CARD_API_KEY_GENERATED_COLOR,
  PROJECT_CARD_API_KEY_GENERATED_LABEL,
  PROJECT_CARD_API_KEY_ICON_SIZE,
  PROJECT_CARD_API_KEY_MISSING_COLOR,
  PROJECT_CARD_API_KEY_NOT_GENERATED_LABEL,
  PROJECT_CARD_PREVIEW_STYLE,
  PROJECT_CARD_SERVICE_COUNT_ICON_SIZE,
  PROJECT_CARD_SERVICE_COUNT_LABEL,
} from './project-card.config';

export function ProjectCardPreview({
  hasActiveApiKey,
}: ProjectCardPreviewProps) {
  const apiKeyStatusLabel = hasActiveApiKey
    ? PROJECT_CARD_API_KEY_GENERATED_LABEL
    : PROJECT_CARD_API_KEY_NOT_GENERATED_LABEL;
  const apiKeyColor = hasActiveApiKey
    ? PROJECT_CARD_API_KEY_GENERATED_COLOR
    : PROJECT_CARD_API_KEY_MISSING_COLOR;

  return (
    <div
      className='w-full h-full bg-[#1D1D1D] border border-foreground/5 rounded-md relative'
      style={PROJECT_CARD_PREVIEW_STYLE}
    >
      <div className='text-xs flex flex-col gap-2 absolute bottom-4 left-4 text-foreground/80'>
        <div className='flex gap-2 items-center'>
          <KeyRound
            fill={apiKeyColor}
            stroke=''
            size={PROJECT_CARD_API_KEY_ICON_SIZE}
          />
          {hasActiveApiKey === undefined ? (
            <Skeleton className='h-3 w-24' />
          ) : (
            apiKeyStatusLabel
          )}
        </div>
        <div className='flex gap-2 items-center'>
          <Circle
            fill={PROJECT_CARD_API_KEY_GENERATED_COLOR}
            stroke=''
            size={PROJECT_CARD_SERVICE_COUNT_ICON_SIZE}
          />
          {PROJECT_CARD_SERVICE_COUNT_LABEL}
        </div>
      </div>
    </div>
  );
}
