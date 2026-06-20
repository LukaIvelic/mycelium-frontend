import { CircleHelp, Code, LayoutGrid, UserRound } from 'lucide-react';
import { SidebarRoute } from './content.constants';
import { createSidebarRouteHandler } from './content.handlers';
import type { SidebarEntry } from './content.types';

const handleProjectsClick = createSidebarRouteHandler(SidebarRoute.Projects);
const handleWorkspaceSettingsClick = createSidebarRouteHandler(
  SidebarRoute.WorkspaceSettings,
);
const handleAccountClick = createSidebarRouteHandler(SidebarRoute.Account);
const handleDocumentationClick = createSidebarRouteHandler(
  SidebarRoute.Documentation,
);

export const standaloneEntries: SidebarEntry[] = [
  {
    label: 'Projects',
    icon: LayoutGrid,
    onClick: handleProjectsClick,
  },
  // { label: 'Billing', icon: CreditCard },
  // { label: 'Usage', icon: SlidersHorizontal },
];

export const settingsEntries: SidebarEntry[] = [
  { label: 'Account', icon: UserRound, onClick: handleAccountClick },
  {
    label: 'Workspace',
    icon: Code,
    onClick: handleWorkspaceSettingsClick,
  },
];

export const helpEntries: SidebarEntry[] = [
  {
    label: 'Documentation',
    icon: CircleHelp,
    onClick: handleDocumentationClick,
  },
  { label: 'Support', icon: CircleHelp },
];
