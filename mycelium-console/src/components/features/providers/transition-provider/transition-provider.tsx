import { tokenStorage } from '@/api/token-storage';
import { useUserProfile } from '@/hooks/use-user-profile.hook';
import { cn } from '@/lib/utils';
import type { ProvidersProps } from '../providers.types';

export function TransitionProvider({ children }: ProvidersProps) {
  const isAuthenticated = tokenStorage.isAuthenticated();
  const { useAccessibilitySettings } = useUserProfile();
  const { data } = useAccessibilitySettings(isAuthenticated);
  const reducedMotion = data?.reducedMotion;

  return (
    <div
      className={cn(reducedMotion && '**:transition-none! **:animate-none!')}
    >
      {children}
    </div>
  );
}
