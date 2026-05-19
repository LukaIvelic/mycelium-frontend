'use client';

import { useRouter } from 'next/navigation';
import { createSidebarEntryClickHandler } from '@/components/layout/sidebar/content/content.handlers';
import type { EntryListProps } from '@/components/layout/sidebar/content/content.types';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

export function EntryList({ entries, indent }: EntryListProps) {
  const router = useRouter();

  return (
    <SidebarMenu className='gap-1'>
      {entries.map(({ label, icon: Icon, onClick }) => {
        const handleEntryClick = createSidebarEntryClickHandler(
          router,
          onClick,
        );

        return (
          <SidebarMenuItem key={label}>
            <SidebarMenuButton
              className={cn(
                'h-10 text-sm text-[#d0d0d0] hover:bg-[#333333] hover:text-[#f5f5f5]',
                indent && 'pl-6',
              )}
              onClick={handleEntryClick}
            >
              <Icon className='size-4' />
              <span>{label}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
