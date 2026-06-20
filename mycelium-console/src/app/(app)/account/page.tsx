'use client';

import { Centered } from '@/components/features/centered/centered';
import { useTabs } from '@/components/features/tabs/use-tabs';
import { ProfileSettings } from '@/components/pages/account-settings/profile/profile';
import { Accessibility } from '@/components/pages/account-settings/tab-content/accessibility/accessibility';
import { ExperimentalFeatures } from '@/components/pages/account-settings/tab-content/experimental-features/experimental-features';
import { Notifications } from '@/components/pages/account-settings/tab-content/notifications/notifications';
import UserProfile from '@/components/pages/account-settings/user-profile/user-profile';
import { cn } from '@/lib/utils';

export default function Page() {
  const tab_content = new Map<string, React.ReactNode>([
    ['Profile', <ProfileSettings key='profile' />],
    ['Notifications', <Notifications key='notifications' />],
    [
      'Experimental features',
      <ExperimentalFeatures key='experimental-features' />,
    ],
    ['Accessibility', <Accessibility key='accessibility' />],
  ]);

  const { activeTab, tabs } = useTabs({
    items: tab_content.keys().toArray(),
  });

  return (
    <Centered className='h-auto min-h-full pb-24'>
      <div
        className={cn(
          'grid grid-cols-4 grid-rows-[auto_auto_auto_auto] items-center gap-4',
          'min-h-max',
        )}
      >
        <div className='col-span-2 pb-4'>
          <h1 className='text-[32px] font-medium'>Account</h1>
          <p className='text-foreground/50'>
            Overview of your account and personal settings
          </p>
        </div>
        <UserProfile className='row-2 col-span-4' />
        <div className='mt-4 row-3 col-span-4 w-full bg-[#1d1d1d]'>{tabs}</div>
        <div className='row-4 col-span-4 pt-4'>
          {tab_content.get(activeTab)}
        </div>
      </div>
    </Centered>
  );
}
