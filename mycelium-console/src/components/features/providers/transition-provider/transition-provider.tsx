import { cn } from '@/lib/utils';
import type { ProvidersProps } from '../providers.types';

export function TransitionProvider({ children }: ProvidersProps) {
  const reducedMotion = true;

  return (
    <div className={cn(reducedMotion && '`**:transition-none!')}>
      {children}
    </div>
  );
}
