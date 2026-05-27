'use client';

import { Centered } from '@/components/features/centered';
import UserProfile from '@/components/pages/account-settings/user-profile/user-profile';
import { cn } from '@/lib/utils';

export default function Page() {
  return (
    <Centered>
      <div
        className={cn(
          'grid grid-cols-4 grid-rows-[auto_auto_auto] items-center gap-4',
        )}
      >
        <div className='col-span-2 pb-4'>
          <h1 className='text-[32px] font-medium'>Account</h1>
          <p className='text-foreground/50'>
            Overview of your account and personal settings
          </p>
        </div>
        <UserProfile className='row-2 col-span-4' />
      </div>
    </Centered>
  );
}
