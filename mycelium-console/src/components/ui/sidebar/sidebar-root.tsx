'use client';

import type { SidebarProps } from './sidebar.types';
import { useSidebar } from './sidebar-context';
import { DesktopSidebar, MobileSidebar, StaticSidebar } from './sidebar-layout';

export function Sidebar({ collapsible = 'offcanvas', ...props }: SidebarProps) {
  const { isMobile } = useSidebar();

  if (collapsible === 'none') {
    return <StaticSidebar {...props} />;
  }

  if (isMobile) {
    return <MobileSidebar collapsible={collapsible} {...props} />;
  }

  return <DesktopSidebar collapsible={collapsible} {...props} />;
}
