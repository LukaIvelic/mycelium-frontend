import type { LucideIcon } from 'lucide-react';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import type { Dispatch, RefObject, SetStateAction } from 'react';
import type { FooterMenuAction } from './footer.constants';

export interface AppSidebarFooterProps {
  email: string;
  fullName: string;
  initials: string;
  randomProfileHex: string;
}

export interface MenuEntry {
  action?: FooterMenuAction;
  danger?: boolean;
  icon: LucideIcon;
  label: string;
  onClick?: (appRouter?: AppRouterInstance) => void;
}

export interface EntryListProps {
  entries: MenuEntry[];
  onSelect?: () => void;
}

export interface ProfileCardProps {
  className?: string;
  email: string;
  fullName: string;
  initials: string;
  randomProfileHex: string;
}

export interface ProfilePopupProps extends ProfileCardProps {
  onClose: () => void;
}

export interface ProfileTriggerProps {
  fullName?: string;
  initials?: string;
  onClick: () => void;
}

export interface CreateFooterEntryClickHandlerParams {
  action?: FooterMenuAction;
  onClick?: MenuEntry['onClick'];
  onSelect?: () => void;
  router: AppRouterInstance;
  signOut: (appRouter?: AppRouterInstance) => void;
}

export type SidebarFooterOpenSetter = Dispatch<SetStateAction<boolean>>;

export type SidebarFooterRootRef = RefObject<HTMLDivElement | null>;
