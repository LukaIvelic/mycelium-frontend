'use client';

import { generateUserProfileFields } from '@/components/pages/account-settings/user-profile/user-profile.config';
import { useUserProfile } from '@/hooks/use-user-profile.hook';
import { useUsers } from '@/hooks/use-users.hook';
import { cn } from '@/lib/utils';

interface UserProfileProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function UserProfile({ className }: UserProfileProps) {
  const { useMe: useUserMe } = useUsers();
  const { useMe: useUserProfileMe } = useUserProfile();
  const { data: user } = useUserMe();
  const { data: userProfile } = useUserProfileMe();

  if (!userProfile || !user) return null;

  const fields = generateUserProfileFields(userProfile);

  return (
    <div
      className={cn(
        'w-full h-fit py-6 px-8',
        'bg-background border border-foreground/10 rounded-md',
        'grid grid-rows-[1fr_auto] gap-6',
        className,
      )}
    >
      <div className='flex gap-4 items-center row-1'>
        <div
          className={cn(
            'rounded-full w-10 h-10 uppercase mix-blend-difference',
            'border border-foreground/10',
            'flex items-center justify-center',
          )}
          style={{ backgroundColor: userProfile.randomProfileHex }}
        >
          {userProfile.initials}
        </div>
        <div className='flex flex-col gap-px'>
          <div className='text-foreground text-[20px]'>
            {userProfile.fullName}
          </div>
          <div className='text-foreground/60 text-[14px]'>{user.email}</div>
        </div>
      </div>
      <div className='flex gap-10'>
        {fields.map((field) => (
          <div key={field.label} className='flex flex-col gap-1'>
            <div className='text-sm text-foreground/50'>{field.label}</div>
            <div className='text-foreground'>{field.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
