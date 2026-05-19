'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ProvidersProps } from './providers.types';

export const queryClient = new QueryClient();

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
