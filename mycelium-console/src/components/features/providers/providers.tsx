'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import type { ProvidersProps } from './providers.types';
import { queryClient } from './query-client';
import { TransitionProvider } from './transition-provider/transition-provider';

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <TransitionProvider>{children}</TransitionProvider>
    </QueryClientProvider>
  );
}
