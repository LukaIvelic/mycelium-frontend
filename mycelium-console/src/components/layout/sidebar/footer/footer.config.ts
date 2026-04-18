import { useAuth } from '@/hooks/use-auth.hook';
import {
  CircleHelp,
  LogOut,
  Settings,
  SlidersHorizontal,
  UserRound,
  type LucideIcon,
} from 'lucide-react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export type MenuEntry = {
  label: string;
  icon: LucideIcon;
  danger?: boolean;
  onClick?: (appRouter?: AppRouterInstance) => void;
};

export const profileConfig = {
  badge: 'HOBBY',
  initials: 'LI',
  name: 'Luka Ivelic',
  role: 'Workspace Owner',
};

export const primaryMenuEntries: MenuEntry[] = [
  { label: 'Account Settings', icon: UserRound },
  { label: 'Workspace Settings', icon: Settings },
  { label: 'Project Usage', icon: SlidersHorizontal },
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
    }
  },
];
