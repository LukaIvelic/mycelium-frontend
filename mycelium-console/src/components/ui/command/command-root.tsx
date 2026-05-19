import { Command as CommandPrimitive } from 'cmdk';
import { cn } from '@/lib/utils';
import type { CommandProps } from './command.types';

export function Command({ className, ...props }: CommandProps) {
  return (
    <CommandPrimitive
      data-slot='command'
      className={cn(
        'flex size-full flex-col overflow-hidden rounded-xl! bg-popover p-1 text-popover-foreground',
        className,
      )}
      {...props}
    />
  );
}
