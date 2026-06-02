import dateFormat from 'dateformat';
import type { UserProfile } from '@/lib/types/user-profile';

export function generateUserProfileFields(userProfile: UserProfile) {
  return [
    {
      label: 'Joined',
      value: dateFormat(userProfile.createdAt, 'mmmm d, yyyy'),
    },
    {
      label: '2FA',
      value: 'Not Enabled',
    },
    {
      label: 'Workspace plan:',
      value: 'Hobby',
    },
  ];
}
