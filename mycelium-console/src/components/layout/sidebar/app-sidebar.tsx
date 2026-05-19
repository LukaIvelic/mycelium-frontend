'use client';

import { AppSidebarContent } from '@/components/layout/sidebar/app-sidebar-content';
import { AppSidebarFooter } from '@/components/layout/sidebar/footer/app-sidebar-footer';
import { Sidebar, SidebarHeader } from '@/components/ui/sidebar';
import { useUsers } from '@/hooks/use-users.hook';

export function AppSidebar() {
  const { useMe } = useUsers();
  const { data: userData } = useMe();
  const user = userData || null;

  return (
    <Sidebar className='border-none'>
      <SidebarHeader className='h-12 p-0' />
      <AppSidebarContent user={user} />
      <AppSidebarFooter user={user} />
    </Sidebar>
  );
}
