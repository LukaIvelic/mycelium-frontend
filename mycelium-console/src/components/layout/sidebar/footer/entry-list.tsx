'use client';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { getMenuItemClass } from '@/components/layout/sidebar/footer/footer.utils';
import type { MenuEntry } from '@/components/layout/sidebar/footer/footer.config';
import { useRouter } from 'next/navigation';

type EntryListProps = {
  entries: MenuEntry[];
  onSelect: () => void;
};

export function EntryList({ entries, onSelect }: EntryListProps) {
  const router = useRouter();

  return (
    <SidebarMenu className="gap-1">
      {entries.map(({ label, icon: Icon, danger, onClick }) => (
        <SidebarMenuItem key={label}>
          <SidebarMenuButton
            className={getMenuItemClass(danger)}
            onClick={() => {
              onClick?.(router);
              onSelect();
            }}
          >
            <Icon className="size-4" />
            <span>{label}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
