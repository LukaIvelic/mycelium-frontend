import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ComboboxTriggerProps } from './combobox.types';

export function ComboboxTrigger({
  className,
  children,
  ...props
}: ComboboxTriggerProps) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot='combobox-trigger'
      className={cn("[&_svg:not([class*='size-'])]:size-4", className)}
      {...props}
    >
      {children}
      <ChevronDownIcon className='pointer-events-none size-4 text-muted-foreground' />
    </ComboboxPrimitive.Trigger>
  );
}
