import { Button } from '@/components/ui/button/button';
import { cn } from '@/lib/utils';
import type { InputGroupButtonProps } from './input-group.types';
import { inputGroupButtonVariants } from './input-group.variants';

export function InputGroupButton({
  className,
  type = 'button',
  variant = 'ghost',
  size = 'xs',
  ...props
}: InputGroupButtonProps) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  );
}
