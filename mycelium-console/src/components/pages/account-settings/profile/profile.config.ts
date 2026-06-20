import type { UserProfile } from '@/lib/types/user-profile';
import type { ProfileSettingsConfig } from './profile.types';

const EMPTY_VALUE = '';

export const PROFILE_SAVE_LABEL = 'Save profile';
export const PROFILE_PASSWORD_LABEL = 'Change password';

export function generateProfileConfig(
  userProfile: UserProfile,
): ProfileSettingsConfig {
  return {
    generalFields: [
      {
        label: 'Display name',
        description: 'Name shown in profile cards and shared workspaces.',
        placeholder: 'Display name',
        defaultValue: userProfile.fullName,
      },
      {
        label: 'Location',
        description: 'Optional location shown on your account profile.',
        placeholder: 'Location',
        defaultValue: userProfile.location ?? EMPTY_VALUE,
      },
      {
        label: 'Company',
        description: 'Organization associated with this account.',
        placeholder: 'Company',
        defaultValue: userProfile.company ?? EMPTY_VALUE,
      },
      {
        label: 'Job title',
        description: 'Role displayed beside your account summary.',
        placeholder: 'Job title',
        defaultValue: userProfile.jobTitle ?? EMPTY_VALUE,
      },
    ],
    securityFields: [
      {
        label: 'Current password',
        description: 'Current password used to verify account ownership.',
        placeholder: 'Current password',
        type: 'password',
      },
      {
        label: 'New password',
        description: 'Replacement password for future sign-ins.',
        placeholder: 'New password',
        type: 'password',
      },
    ],
  };
}
