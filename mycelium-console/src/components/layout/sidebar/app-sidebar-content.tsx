"use client";

import { useState } from "react";
import { ChevronDown, Settings, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import {
  helpEntries,
  settingsEntries,
  standaloneEntries,
} from "@/components/layout/sidebar/content/content.config";
import { EntryList } from "@/components/layout/sidebar/content/entry-list";
import { ProfileCard } from "@/components/layout/sidebar/footer/profile-card";
import { User } from "@/lib/types/user";
import { Separator } from "@/components/ui/separator";

type AppSidebarContentProps = {
  user?: User | null;
};

export function AppSidebarContent({ user }: AppSidebarContentProps) {
  const [settingsOpen, setSettingsOpen] = useState(true);

  return (
    <SidebarContent className="gap-2 px-2 pb-2">
      <SidebarGroup className="p-0">
        <ProfileCard
          fullName={user?.full_name}
          email={user?.email}
          initials={user?.initials}
        />
      </SidebarGroup>

      <SidebarGroup className="p-0">
        <SidebarGroupContent>
          <EntryList entries={standaloneEntries} />
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup className="p-0">
        <SidebarGroupLabel className="h-auto p-0">
          <button
            type="button"
            className="flex h-10 w-full items-center justify-between rounded-lg px-2 text-sm text-[#d0d0d0] transition-colors hover:bg-[#333333] hover:text-[#f5f5f5]"
            onClick={() => setSettingsOpen((prev) => !prev)}
            aria-expanded={settingsOpen}
          >
            <span className="flex items-center gap-2">
              <Settings className="size-4" />
              <span>Settings</span>
            </span>
            <ChevronDown
              className={cn(
                "size-4 transition-transform duration-200",
                settingsOpen ? "rotate-180" : "",
              )}
            />
          </button>
        </SidebarGroupLabel>

        {settingsOpen && (
          <SidebarGroupContent className="mt-1">
            <EntryList entries={settingsEntries} indent />
          </SidebarGroupContent>
        )}
      </SidebarGroup>
      <Separator className="bg-foreground/10" />
      <SidebarGroup className="p-0">
        <SidebarGroupContent>
          <EntryList entries={helpEntries} />
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
