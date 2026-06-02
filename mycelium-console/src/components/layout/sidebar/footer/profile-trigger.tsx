'use client';

import { EllipsisVertical } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton/skeleton';
import { getTextColor } from '@/lib/get-text-color';
import type { ProfileTriggerProps } from './footer.types';

export function ProfileTrigger({ userProfile, onClick }: ProfileTriggerProps) {
  if (!userProfile) {
    return <Skeleton className='h-12 w-full rounded-lg' />;
  }

  const textColor = getTextColor(userProfile.randomProfileHex);

  return (
    <button
      type='button'
      className='flex h-12 w-full items-center justify-between rounded-lg px-3 transition-colors hover:bg-[#434343] hover:cursor-pointer'
      onClick={onClick}
    >
      <div className='flex items-center gap-3'>
        <div
          className='flex size-6 items-center justify-center rounded-full text-xs'
          style={{ backgroundColor: userProfile.randomProfileHex }}
        >
          <span style={{ color: textColor }}>{userProfile.initials}</span>
        </div>
        <span className='text-[14px] font-medium'>{userProfile.fullName}</span>
      </div>
      <EllipsisVertical className='size-4 text-foreground/50' />
    </button>
  );
}
