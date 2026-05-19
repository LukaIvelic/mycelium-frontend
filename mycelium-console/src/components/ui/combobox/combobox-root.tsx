import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { ChevronDownIcon, XIcon } from 'lucide-react';
import { InputGroupButton } from '@/components/ui/input-group';
import { cn } from '@/lib/utils';
import type {
  ComboboxClearProps,
  ComboboxTriggerProps,
  ComboboxValueProps,
} from './combobox.types';

const Combobox = ComboboxPrimitive.Root;

function ComboboxValue({ ...props }: ComboboxValueProps) {
  return <ComboboxPrimitive.Value data-slot='combobox-value' {...props} />;
}

function ComboboxTrigger({
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

function ComboboxClear({ className, ...props }: ComboboxClearProps) {
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

export { Combobox, ComboboxClear, ComboboxTrigger, ComboboxValue };
