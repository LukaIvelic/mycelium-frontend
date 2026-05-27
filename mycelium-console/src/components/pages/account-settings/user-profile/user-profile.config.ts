import dateFormat from 'dateformat';
import type { UserProfile } from '@/lib/types/user-profile';

export function generateUserProfileFields(userProfile: UserProfile) {
  return [
    {
      label: 'Username',
      value: `@${userProfile.username}`,
    },
    {
      label: 'Email',
      value: userProfile.email,
    },
    {
      label: 'Registered',
      value: dateFormat(userProfile.createdAt, 'mmmm d, yyyy'),
    },
    {
      label: 'Location',
      value: userProfile.location,
    },
    {
      label: 'Company',
      value: userProfile.company,
    },
    {
      label: 'Job Title',
      value: userProfile.jobTitle,
    },
  ];
}
