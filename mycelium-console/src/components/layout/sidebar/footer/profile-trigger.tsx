'use client';

import { EllipsisVertical } from 'lucide-react';
import { useUserProfile } from '@/hooks/use-user-profile.hook';
import type { ProfileTriggerProps } from './footer.types';

export function ProfileTrigger({
  fullName,
  initials,
  onClick,
}: ProfileTriggerProps) {
  const { useMe } = useUserProfile();
  const { data: userProfile } = useMe();

  return (
    <button
      type='button'
      className='flex h-12 w-full items-center justify-between rounded-lg px-3 transition-colors hover:bg-[#434343] hover:cursor-pointer'
      onClick={onClick}
    >
      <div className='flex items-center gap-3'>
        <div
          className='flex h-6 w-6 items-center justify-center rounded-full mix-blend-difference text-xs font-medium'
          style={{ backgroundColor: userProfile?.randomProfileHex }}
        >
          {initials}
        </div>
        <span className='text-[14px] font-medium'>{fullName}</span>
      </div>
      <EllipsisVertical className='size-4 text-foreground/50' />
    </button>
  );
}
