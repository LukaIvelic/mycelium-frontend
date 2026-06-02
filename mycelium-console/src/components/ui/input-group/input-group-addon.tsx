import { cn } from '@/lib/utils';
import type { InputGroupAddonProps } from './input-group.types';
import { inputGroupAddonVariants } from './input-group.variants';

export function InputGroupAddon({
  className,
  align = 'inline-start',
  ...props
}: InputGroupAddonProps) {
  return (
    <div
      {...props}
      data-slot='input-group-addon'
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
    />
  );
}
