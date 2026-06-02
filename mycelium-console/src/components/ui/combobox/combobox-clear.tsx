import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { XIcon } from 'lucide-react';
import { InputGroupButton } from '@/components/ui/input-group/input-group';
import { cn } from '@/lib/utils';
import type { ComboboxClearProps } from './combobox.types';

export function ComboboxClear({ className, ...props }: ComboboxClearProps) {
  return (
    <ComboboxPrimitive.Clear
      data-slot='combobox-clear'
      render={<InputGroupButton variant='ghost' size='icon-xs' />}
      className={cn(className)}
      {...props}
    >
      <XIcon className='pointer-events-none' />
    </ComboboxPrimitive.Clear>
  );
}
