import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { cn } from '@/lib/utils';
import type { ComboboxChipsInputProps } from './combobox.types';

export function ComboboxChipsInput({
  className,
  ...props
}: ComboboxChipsInputProps) {
  return (
    <ComboboxPrimitive.Input
      data-slot='combobox-chip-input'
      className={cn('min-w-16 flex-1 outline-none', className)}
      {...props}
    />
  );
}
