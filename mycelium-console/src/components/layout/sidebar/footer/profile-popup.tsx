'use client';

import { EntryList } from '@/components/layout/sidebar/footer/entry-list';
import {
  actionMenuEntries,
  primaryMenuEntries,
  secondaryMenuEntries,
} from '@/components/layout/sidebar/footer/footer.config';
import { ProfileCard } from '@/components/layout/sidebar/footer/profile-card';

type ProfilePopupProps = {
  fullName?: string;
  email?: string;
  initials?: string;
  onClose: () => void;
};

export function ProfilePopup({
  fullName,
  email,
  initials,
  onClose,
}: ProfilePopupProps) {
  return (
    <div className='absolute right-0 bottom-14 z-30 w-[calc(var(--sidebar-width)-1rem)] rounded-xl border border-[#3a3a3a] bg-[#1c1c1c] p-2 shadow-xl'>
      <ProfileCard
        className='rounded-md'
        fullName={fullName}
        email={email}
        initials={initials}
      />

      <div className='mt-2'>
        <EntryList entries={primaryMenuEntries} onSelect={onClose} />
        <div className='my-2 h-px w-full bg-[#3a3a3a]' />
        <EntryList entries={secondaryMenuEntries} onSelect={onClose} />
        <div className='my-2 h-px w-full bg-[#3a3a3a]' />
        <EntryList entries={actionMenuEntries} onSelect={onClose} />
      </div>
    </div>
  );
}
