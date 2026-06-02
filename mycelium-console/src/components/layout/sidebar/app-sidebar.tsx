'use client';

import { AppSidebarContent } from '@/components/layout/sidebar/app-sidebar-content/app-sidebar-content';
import { AppSidebarFooter } from '@/components/layout/sidebar/footer/app-sidebar-footer';
import { Sidebar, SidebarHeader } from '@/components/ui/sidebar/sidebar';
import { useUserProfile } from '@/hooks/use-user-profile.hook';

export function AppSidebar() {
  const { useMe: useUserProfileMe } = useUserProfile();
  const { data: userProfile } = useUserProfileMe();

  return (
    <Sidebar className='border-none!'>
      <SidebarHeader className='h-12 p-0' />
      <AppSidebarContent userProfile={userProfile} />
      <AppSidebarFooter userProfile={userProfile} />
    </Sidebar>
  );
}
