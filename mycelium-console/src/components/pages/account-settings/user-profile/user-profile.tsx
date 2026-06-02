'use client';

import { generateUserProfileFields } from '@/components/pages/account-settings/user-profile/user-profile.config';
import { Skeleton } from '@/components/ui/skeleton/skeleton';
import { useUserProfile } from '@/hooks/use-user-profile.hook';
import { useUsers } from '@/hooks/use-users.hook';
import { getTextColor } from '@/lib/get-text-color';
import { cn } from '@/lib/utils';

interface UserProfileProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function UserProfile({ className }: UserProfileProps) {
  const { useMe: useUserMe } = useUsers();
  const { useMe: useUserProfileMe } = useUserProfile();
  const { data: user } = useUserMe();
  const { data: userProfile } = useUserProfileMe();

  if (!userProfile || !user)
    return <Skeleton className={cn('w-full h-48 rounded-md', className)} />;

  const fields = generateUserProfileFields(userProfile);
  const textColor = getTextColor(userProfile.randomProfileHex);

  return (
    <div
      className={cn(
        'w-full py-6 px-8 h-48',
        'bg-background border border-foreground/10 rounded-md',
        'grid grid-rows-[1fr_auto] gap-6',
        className,
      )}
    >
      <div className='flex gap-4 items-center row-1'>
        <div
          className={cn(
            'rounded-full w-20 h-20 uppercase',
            'border border-foreground/10',
            'flex items-center justify-center',
          )}
          style={{ backgroundColor: userProfile.randomProfileHex }}
        >
          <span className='text-[20px]' style={{ color: textColor }}>
            {userProfile.initials}
          </span>
        </div>
        <div className='flex flex-col gap-px'>
          <div className='text-foreground text-[20px]'>
            {userProfile.fullName}
          </div>
          <div className='text-foreground/60 text-[14px]'>
            @{userProfile.username}
          </div>
          <div className='text-foreground/60 text-[14px]'>
            {userProfile.jobTitle} at {userProfile.company}
          </div>
          <div className='text-foreground/60 text-[14px]'>
            {userProfile.location}
          </div>
        </div>
      </div>
      <div className={cn('col-start-1 row-2 flex gap-2')}>
        {fields.map((field) => (
          <div
            key={field.label}
            className={cn(
              'w-fit flex gap-1 p-1 px-3 rounded-lg',
              'text-xs text-foreground/50',
              'border border-foreground/10 bg-foreground/10',
            )}
          >
            <div>{field.label}</div>
            <div>{field.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
