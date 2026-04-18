"use client";

import { Sidebar, SidebarHeader } from "@/components/ui/sidebar";
import { AppSidebarFooter } from "@/components/layout/sidebar/footer/app-sidebar-footer";
import { AppSidebarContent } from "@/components/layout/sidebar/app-sidebar-content";
import { useEffect, useState } from "react";
import { tokenStorage } from "@/api/token-storage";
import { User } from "@/lib/types/user";
import { UsersService } from "@/api/services/user-service/user-service";

export function AppSidebar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = tokenStorage.getToken();
    if (!token) return;

    const usersService = new UsersService();
    usersService
      .findMe()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  return (
    <Sidebar className="border-none">
      <SidebarHeader className="h-12 p-0" />
      <AppSidebarContent user={user} />
      <AppSidebarFooter user={user} />
    </Sidebar>
  );
}
