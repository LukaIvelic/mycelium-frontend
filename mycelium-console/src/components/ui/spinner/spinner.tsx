import { Loader2Icon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { SPINNER_ARIA_LABEL } from './spinner.config';
import type { SpinnerProps } from './spinner.types';

function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <Loader2Icon
      role='status'
      aria-label={SPINNER_ARIA_LABEL}
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  );
}

export { Spinner };
