'use client';

import * as React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet/sheet';
import { SIDEBAR_WIDTH_MOBILE } from './sidebar.constants';
import type { SidebarProps } from './sidebar.types';
import { useSidebar } from './sidebar-context';

export function MobileSidebar({
  side = 'left',
  dir,
  children,
  ...props
}: SidebarProps) {
  const { openMobile, setOpenMobile } = useSidebar();

  return (
    <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
      <SheetContent
        dir={dir}
        data-sidebar='sidebar'
        data-slot='sidebar'
        data-mobile='true'
        className='w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden'
        style={createMobileSidebarStyle()}
        side={side}
      >
        <SheetHeader className='sr-only'>
          <SheetTitle>Sidebar</SheetTitle>
          <SheetDescription>Displays the mobile sidebar.</SheetDescription>
        </SheetHeader>
        <div className='flex h-full w-full flex-col'>{children}</div>
      </SheetContent>
    </Sheet>
  );
}

function createMobileSidebarStyle() {
  return { '--sidebar-width': SIDEBAR_WIDTH_MOBILE } as React.CSSProperties;
}
