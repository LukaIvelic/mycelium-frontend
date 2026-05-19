import type { LucideIcon } from 'lucide-react';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export interface SidebarEntry {
  danger?: boolean;
  icon: LucideIcon;
  label: string;
  onClick?: (appRouter?: AppRouterInstance) => void;
}

export interface EntryListProps {
  entries: SidebarEntry[];
  indent?: boolean;
}
