'use client';

import { AppSidebarContent } from '@/components/layout/sidebar/app-sidebar-content';
import { AppSidebarFooter } from '@/components/layout/sidebar/footer/app-sidebar-footer';
import { Sidebar, SidebarHeader } from '@/components/ui/sidebar';
import { useUserProfile } from '@/hooks/use-user-profile.hook';

export function AppSidebar() {
  const { useMe: useUserProfileMe } = useUserProfile();
  const { data: userProfile } = useUserProfileMe();

  if (!userProfile) return null;

  const fullName = userProfile.fullName;
  const email = userProfile.email;
  const initials = userProfile.initials;
  const randomProfileHex = userProfile.randomProfileHex;

  return (
    <Sidebar className='border-none'>
      <SidebarHeader className='h-12 p-0' />
      <AppSidebarContent
        fullName={fullName}
        email={email}
        initials={initials}
        randomProfileHex={randomProfileHex}
      />
      <AppSidebarFooter
        fullName={fullName}
        email={email}
        initials={initials}
        randomProfileHex={randomProfileHex}
      />
    </Sidebar>
  );
}
