import { Eye, Trash } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  API_KEY_ACTION_ICON_SIZE,
  API_KEY_ACTION_STROKE_WIDTH,
} from '../generate-api-key.config';
import type { ApiKeyActionsProps } from '../generate-api-key.types';

export function ApiKeyActions({ onRevoke }: ApiKeyActionsProps) {
  return (
    <div
      className={cn(
        'h-full gap-2',
        'flex items-center justify-center col-start-5 row-span-2',
        'transition-all',
      )}
    >
      <div
        className={cn(
          'p-2',
          'border border-foreground/10 rounded-md group hover:cursor-pointer',
        )}
      >
        <Eye
          className={cn('text-foreground/50', 'group-hover:text-foreground')}
          size={API_KEY_ACTION_ICON_SIZE}
          strokeWidth={API_KEY_ACTION_STROKE_WIDTH}
        />
      </div>
      <button
        type='button'
        className={cn(
          'p-2',
          'border border-foreground/10 rounded-md group hover:cursor-pointer',
        )}
        onClick={onRevoke}
      >
        <Trash
          className={cn('text-foreground/50', 'group-hover:text-red-400')}
          size={API_KEY_ACTION_ICON_SIZE}
          strokeWidth={API_KEY_ACTION_STROKE_WIDTH}
        />
      </button>
    </div>
  );
}
