import { UserProfile } from '@/lib/types/user-profile';

export function generateProfileConfig(userProfile: UserProfile) {
  return [
    {
      placeholder: 'Display Name',
      defaultValue: userProfile.fullName,
    },
    {
      placeholder: 'Location',
      defaultValue: userProfile.location,
    },
    {
      placeholder: 'Company',
      defaultValue: userProfile.company,
    },
    {
      placeholder: 'Job Title',
      defaultValue: userProfile.jobTitle,
    },
  ];
}
