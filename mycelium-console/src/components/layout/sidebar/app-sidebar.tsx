'use client';

import { useEffect, useState } from 'react';
import { AppSidebarContent } from '@/components/layout/sidebar/app-sidebar-content';
import { AppSidebarFooter } from '@/components/layout/sidebar/footer/app-sidebar-footer';
import { Sidebar, SidebarHeader } from '@/components/ui/sidebar';
import { useUsers } from '@/hooks/use-users.hook';
import type { User } from '@/lib/types/user';

export function AppSidebar() {
  const [user, setUser] = useState<User | null>(null);
  const { useMe } = useUsers();
  const { data: userData } = useMe();

  useEffect(() => {
    setUser(userData || null);
  }, [userData]);

  return (
    <Sidebar className='border-none'>
      <SidebarHeader className='h-12 p-0' />
      <AppSidebarContent user={user} />
      <AppSidebarFooter user={user} />
    </Sidebar>
  );
}
