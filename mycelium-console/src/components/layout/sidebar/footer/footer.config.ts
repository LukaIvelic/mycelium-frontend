import {
  CircleHelp,
  LogOut,
  type LucideIcon,
  Settings,
  SlidersHorizontal,
  UserRound,
} from 'lucide-react';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useAuth } from '@/hooks/use-auth.hook';

export type MenuEntry = {
  label: string;
  icon: LucideIcon;
  danger?: boolean;
  onClick?: (appRouter?: AppRouterInstance) => void;
};

export const primaryMenuEntries: MenuEntry[] = [
  { label: 'Account', icon: UserRound },
  { label: 'Workspace', icon: Settings },
  { label: 'Usage', icon: SlidersHorizontal },
];

export const secondaryMenuEntries: MenuEntry[] = [
  { label: 'Documentation', icon: CircleHelp },
  { label: 'Support', icon: CircleHelp },
];

export const actionMenuEntries: MenuEntry[] = [
  {
    label: 'Log out',
    icon: LogOut,
    danger: true,
    onClick: (appRouter?: AppRouterInstance) => {
      const { signOut } = useAuth();
      signOut(appRouter);
    },
  },
];
