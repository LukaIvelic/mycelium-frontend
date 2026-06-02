'use client';

import { Skeleton } from '@/components/ui/skeleton/skeleton';
import { getTextColor } from '@/lib/get-text-color';
import { cn } from '@/lib/utils';
import type {
  ProfileCardProps,
  ProfileCardSkeletonProps,
} from './footer.types';

export function ProfileCard({ userProfile, className }: ProfileCardProps) {
  if (!userProfile) {
    return <ProfileCardSkeleton className={className} />;
  }

  const textColor = getTextColor(userProfile.randomProfileHex);

  return (
    <div
      className={cn(
        'rounded-xl border border-[#3a3a3a] bg-[#2e2e2e] p-4 py-5',
        className,
      )}
    >
      <div className='flex flex-col items-center gap-3'>
        <div
          className='flex size-12 items-center justify-center rounded-full text-sm'
          style={{ backgroundColor: userProfile.randomProfileHex }}
        >
          <span style={{ color: textColor }}>{userProfile.initials}</span>
        </div>
        <div className='text-center'>
          <p className='text-sm text-[#f5f5f5]'>{userProfile.fullName}</p>
          <p className='text-sm text-[#a0a0a0]'>{userProfile.email}</p>
        </div>
      </div>
    </div>
  );
}

function ProfileCardSkeleton({ className }: ProfileCardSkeletonProps) {
  return (
    <div
      className={cn(
        'flex h-35 items-center justify-center rounded-xl border border-[#3a3a3a] bg-[#2e2e2e] p-4 py-5',
        className,
      )}
    >
      <div className='flex flex-col items-center gap-3'>
        <Skeleton className='size-15 rounded-full' />
        <div className='flex flex-col items-center gap-2'>
          <Skeleton className='h-4 w-24' />
          <Skeleton className='h-4 w-36' />
        </div>
      </div>
    </div>
  );
}
