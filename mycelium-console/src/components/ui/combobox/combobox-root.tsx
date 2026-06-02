import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import type { ComboboxValueProps } from './combobox.types';

export const Combobox = ComboboxPrimitive.Root;

function ComboboxValue({ ...props }: ComboboxValueProps) {
  return <ComboboxPrimitive.Value data-slot='combobox-value' {...props} />;
}

export { ComboboxValue };
