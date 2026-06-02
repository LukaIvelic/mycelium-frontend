'use client';

import { useRouter } from 'next/navigation';
import { createFooterEntryClickHandler } from '@/components/layout/sidebar/footer/footer.handlers';
import type { EntryListProps } from '@/components/layout/sidebar/footer/footer.types';
import { getMenuItemClass } from '@/components/layout/sidebar/footer/footer.utils';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar/sidebar';
import { useAuth } from '@/hooks/use-auth.hook';

export function EntryList({ entries, onSelect }: EntryListProps) {
  const router = useRouter();
  const { signOut } = useAuth();

  return (
    <SidebarMenu className='gap-1'>
      {entries.map(({ label, icon: Icon, danger, action, onClick }) => {
        const handleEntryClick = createFooterEntryClickHandler({
          action,
          onClick,
          onSelect,
          router,
          signOut,
        });

        return (
          <SidebarMenuItem key={label}>
            <SidebarMenuButton
              className={getMenuItemClass(danger)}
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
