import { Input } from '@/components/features/input/input';
import { Button } from '@/components/ui/button/button';
import { Skeleton } from '@/components/ui/skeleton/skeleton';
import { useUserProfile } from '@/hooks/use-user-profile.hook';
import { cn } from '@/lib/utils';
import { generateProfileConfig } from './profile.config';

export function ProfileSettings() {
  const { useMe } = useUserProfile();
  const { data: userProfile, isLoading } = useMe();

  if (isLoading || !userProfile) return <Skeleton className='h-72 w-full' />;

  const config = generateProfileConfig(userProfile);

  return (
    <div className='flex flex-col gap-4'>
      <div
        className={cn('flex flex-col gap-4', 'xl:grid xl:grid-cols-2 xl:gap-6')}
      >
        <div className='col-1 flex flex-col gap-6'>
          <h2 className='text-[20px]'>General</h2>
          <div className='flex flex-col gap-3 w-full'>
            {config.map((item) => (
              <Input
                key={item.placeholder}
                className='rounded-[8px] h-min'
                placeholder={item.placeholder}
                defaultValue={item.defaultValue ?? ''}
              />
            ))}
            <Button className='data-[state=active]:rounded-[8px]!'>Save</Button>
          </div>
        </div>
        <div className='col-2 flex flex-col gap-6'>
          <h2 className='text-[20px]'>Security</h2>
          <div className='flex flex-col gap-3 w-full'>
            <Input
              className='rounded-[8px] h-min'
              placeholder='Password'
              type='password'
            />
            <Input
              className='rounded-[8px] h-min'
              placeholder='New Password'
              type='password'
            />
            <Button className='data-[state=active]:rounded-[8px]!'>
              Change password
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
