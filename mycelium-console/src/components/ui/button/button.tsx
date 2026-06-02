import { Button as ButtonPrimitive } from '@base-ui/react/button';

import { cn } from '@/lib/utils';
import type { ButtonProps } from './button.types';
import {
  BUTTON_DEFAULT_SIZE,
  BUTTON_DEFAULT_VARIANT,
  buttonVariants,
} from './button.variants';

function Button({
  className,
  variant = BUTTON_DEFAULT_VARIANT,
  size = BUTTON_DEFAULT_SIZE,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button };
