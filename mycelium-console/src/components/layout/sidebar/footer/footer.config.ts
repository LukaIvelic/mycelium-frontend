import {
  CircleHelp,
  LogOut,
  Settings,
  SlidersHorizontal,
  UserRound,
} from 'lucide-react';
import { FooterMenuAction } from './footer.constants';
import type { MenuEntry } from './footer.types';

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
    action: FooterMenuAction.SignOut,
  },
];
