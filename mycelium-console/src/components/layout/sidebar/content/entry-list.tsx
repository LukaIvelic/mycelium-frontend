'use client';

import { useRouter } from 'next/navigation';
import type { SidebarEntry } from '@/components/layout/sidebar/content/content.config';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

type EntryListProps = {
  entries: SidebarEntry[];
  indent?: boolean;
};

export function EntryList({ entries, indent }: EntryListProps) {
  const router = useRouter();

  return (
    <SidebarMenu className='gap-1'>
      {entries.map(({ label, icon: Icon, onClick }) => (
        <SidebarMenuItem key={label}>
          <SidebarMenuButton
            className={cn(
              'h-10 text-sm text-[#d0d0d0] hover:bg-[#333333] hover:text-[#f5f5f5]',
              indent && 'pl-6',
            )}
            onClick={() => onClick?.(router)}
          >
            <Icon className='size-4' />
            <span>{label}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
