'use client';

import { Toggle as TogglePrimitive } from '@base-ui/react/toggle';

import { cn } from '@/lib/utils';
import type { ToggleProps } from './toggle.types';
import {
  TOGGLE_DEFAULT_SIZE,
  TOGGLE_DEFAULT_VARIANT,
  toggleVariants,
} from './toggle.variants';

function Toggle({
  className,
  variant = TOGGLE_DEFAULT_VARIANT,
  size = TOGGLE_DEFAULT_SIZE,
  ...props
}: ToggleProps) {
  return (
    <TogglePrimitive
      data-slot='toggle'
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle };
