'use client';

import { tokenStorage } from '@/api/token-storage';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SidebarFooter } from '@/components/ui/sidebar';
import { usePopupDismiss } from '@/components/layout/sidebar/footer/footer.utils';
import { ProfilePopup } from '@/components/layout/sidebar/footer/profile-popup';
import { ProfileTrigger } from '@/components/layout/sidebar/footer/profile-trigger';
import { useUsers } from '@/hooks/use-users.hook';
import { User } from '@/lib/types/user';

export function AppSidebarFooter() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const closePopup = useCallback(() => setOpen(false), []);
  const { findMe } = useUsers();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = tokenStorage.getToken();
    if (token) {
      findMe().then(user=>setUser(user));
    }
  }, [findMe]);


  usePopupDismiss(open, rootRef, closePopup);

  return (
    <SidebarFooter className="mt-auto p-2">
      <div ref={rootRef} className="relative">
        {open ? (
          <ProfilePopup
            fullName={user?.full_name}
            email={user?.email}
            initials={user?.initials}
            onClose={closePopup}
          />
        ) : null}

        <ProfileTrigger
          fullName={user?.full_name}
          initials={user?.initials}
          onClick={() => setOpen((prev) => !prev)}
        />
      </div>
    </SidebarFooter>
  );
}
