"use client";

import { useCallback, useRef, useState } from "react";
import { SidebarFooter } from "@/components/ui/sidebar";
import { usePopupDismiss } from "@/components/layout/sidebar/footer/footer.utils";
import { ProfilePopup } from "@/components/layout/sidebar/footer/profile-popup";
import { ProfileTrigger } from "@/components/layout/sidebar/footer/profile-trigger";
import { User } from "@/lib/types/user";

type AppSidebarFooterProps = {
  user?: User | null;
};

export function AppSidebarFooter({ user }: AppSidebarFooterProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const closePopup = useCallback(() => setOpen(false), []);

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
