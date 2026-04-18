import {
  CircleHelp,
  Code,
  CreditCard,
  LayoutGrid,
  Settings,
  SlidersHorizontal,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type SidebarEntry = {
  label: string;
  icon: LucideIcon;
  danger?: boolean;
  onClick?: (appRouter?: AppRouterInstance) => void;
};

export const standaloneEntries: SidebarEntry[] = [
  {
    label: "Projects",
    icon: LayoutGrid,
    onClick: (appRouter) => appRouter?.push("/projects"),
  },
  { label: "Account", icon: UserRound },
  {
    label: "Workspace",
    icon: Code,
    onClick: (appRouter) => appRouter?.push("/workspace/settings"),
  },
  { label: "Usage", icon: SlidersHorizontal },
];

export const settingsEntries: SidebarEntry[] = [
  { label: "Billing", icon: CreditCard },
];

export const helpEntries: SidebarEntry[] = [
  { label: "Documentation", icon: CircleHelp },
  { label: "Support", icon: CircleHelp },
];
