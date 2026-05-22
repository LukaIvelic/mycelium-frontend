'use client';

import { Switch as SwitchPrimitive } from '@base-ui/react/switch';
import { cn } from '@/lib/utils';
import type { SwitchProps } from './switch.types';

function Switch({ className, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot='switch'
      className={cn(
        'inline-flex h-6 w-10 items-center rounded-full border border-foreground/10 bg-foreground/10 p-0.5 outline-none transition-colors',
        'hover:cursor-pointer data-checked:bg-foreground/80 data-unchecked:bg-foreground/10',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot='switch-thumb'
        className={cn(
          'size-4 rounded-full bg-background shadow-xs transition-transform',
          'data-checked:translate-x-4 data-unchecked:translate-x-0',
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
