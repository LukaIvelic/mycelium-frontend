'use client';

import { ChevronDown, Settings } from 'lucide-react';
import { useState } from 'react';
import {
  helpEntries,
  settingsEntries,
  standaloneEntries,
} from '@/components/layout/sidebar/content/content.config';
import { EntryList } from '@/components/layout/sidebar/content/entry-list';
import { ProfileCard } from '@/components/layout/sidebar/footer/profile-card';
import { Separator } from '@/components/ui/separator/separator';
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/components/ui/sidebar/sidebar';
import { cn } from '@/lib/utils';
import { createToggleSettingsHandler } from './app-sidebar-content.handlers';
import type { AppSidebarContentProps } from './app-sidebar-content.types';

export function AppSidebarContent({ userProfile }: AppSidebarContentProps) {
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

  const handleToggleSettings = createToggleSettingsHandler(setSettingsOpen);

  return (
    <SidebarContent className='gap-2 px-2 pb-2'>
      <SidebarGroup className='p-0'>
        <ProfileCard userProfile={userProfile} />
      </SidebarGroup>

      <SidebarGroup className='p-0'>
        <SidebarGroupContent>
          <EntryList entries={standaloneEntries} />
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup className='p-0'>
        <SidebarGroupLabel className='h-auto p-0'>
          <button
            type='button'
            className='flex h-10 w-full items-center justify-between rounded-lg px-2 text-sm text-[#d0d0d0] transition-colors hover:bg-[#333333] hover:text-[#f5f5f5]'
            onClick={handleToggleSettings}
            aria-expanded={settingsOpen}
          >
            <span className='flex items-center gap-2'>
              <Settings className='size-4' />
              <span>Settings</span>
            </span>
            <ChevronDown
              className={cn(
                'size-4 transition-transform duration-200',
                settingsOpen ? 'rotate-180' : '',
              )}
            />
          </button>
        </SidebarGroupLabel>

        {settingsOpen && (
          <SidebarGroupContent className='mt-1'>
            <EntryList entries={settingsEntries} indent />
          </SidebarGroupContent>
        )}
      </SidebarGroup>
      <Separator className='bg-foreground/10' />
      <SidebarGroup className='p-0'>
        <SidebarGroupContent>
          <EntryList entries={helpEntries} />
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
