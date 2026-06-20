import { Button } from '@/components/ui/button/button';
import { Skeleton } from '@/components/ui/skeleton/skeleton';
import { useUserProfile } from '@/hooks/use-user-profile.hook';
import { SettingsRow } from '../tab-content/_components/settings-tab-panel/settings-row';
import { SettingsSection } from '../tab-content/_components/settings-tab-panel/settings-section';
import {
  generateProfileConfig,
  PROFILE_PASSWORD_LABEL,
  PROFILE_SAVE_LABEL,
} from './profile.config';
import { ProfileField } from './profile-field';

export function ProfileSettings() {
  const { useMe } = useUserProfile();
  const { data: userProfile, isLoading } = useMe();

  if (isLoading || !userProfile) return <Skeleton className='h-72 w-full' />;

  const config = generateProfileConfig(userProfile);

  return (
    <div className='flex w-full flex-col gap-8'>
      <SettingsSection
        title='General'
        description='Personal details shown across your account and workspace activity.'
      >
        {config.generalFields.map((field) => (
          <ProfileField key={field.label} field={field} />
        ))}
        <SettingsRow
          label='Profile changes'
          description='Save updates to your personal account information.'
        >
          <Button size='sm' type='button'>
            {PROFILE_SAVE_LABEL}
          </Button>
        </SettingsRow>
      </SettingsSection>
      <SettingsSection
        title='Security'
        description='Password settings for signing in to this account.'
      >
        {config.securityFields.map((field) => (
          <ProfileField key={field.label} field={field} />
        ))}
        <SettingsRow
          label='Password update'
          description='Apply the password change after both fields are filled.'
        >
          <Button size='sm' type='button'>
            {PROFILE_PASSWORD_LABEL}
          </Button>
        </SettingsRow>
      </SettingsSection>
    </div>
  );
}
