import { cn } from '@/lib/utils';
import {
  handleInputGroupAddonClick,
  handleInputGroupAddonKeyDown,
} from './input-group.handlers';
import type { InputGroupAddonProps } from './input-group.types';
import { inputGroupAddonVariants } from './input-group.variants';

export function InputGroupAddon({
  className,
  align = 'inline-start',
  ...props
}: InputGroupAddonProps) {
  return (
    <fieldset
      data-slot='input-group-addon'
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={handleInputGroupAddonClick}
      onKeyDown={handleInputGroupAddonKeyDown}
      {...props}
    />
  );
}
