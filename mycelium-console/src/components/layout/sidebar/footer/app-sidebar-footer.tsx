'use client';

import { useRef, useState } from 'react';
import {
  createClosePopupHandler,
  createTogglePopupHandler,
} from '@/components/layout/sidebar/footer/footer.handlers';
import type { AppSidebarFooterProps } from '@/components/layout/sidebar/footer/footer.types';
import { usePopupDismiss } from '@/components/layout/sidebar/footer/footer.utils';
import { ProfilePopup } from '@/components/layout/sidebar/footer/profile-popup';
import { ProfileTrigger } from '@/components/layout/sidebar/footer/profile-trigger';
import { SidebarFooter } from '@/components/ui/sidebar/sidebar';

export function AppSidebarFooter({ userProfile }: AppSidebarFooterProps) {
  const [open, setOpen] = useState<boolean>(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const closePopup = createClosePopupHandler(setOpen);
  const togglePopup = createTogglePopupHandler(setOpen);

  usePopupDismiss(open, rootRef, closePopup);

  return (
    <SidebarFooter className='mt-auto p-2'>
      <div ref={rootRef} className='relative'>
        {open && (
          <ProfilePopup userProfile={userProfile} onClose={closePopup} />
        )}

        <ProfileTrigger userProfile={userProfile} onClick={togglePopup} />
      </div>
    </SidebarFooter>
  );
}
