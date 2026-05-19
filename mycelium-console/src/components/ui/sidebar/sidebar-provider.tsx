'use client';

import * as React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import {
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_ICON,
  SidebarState,
} from './sidebar.constants';
import {
  createSidebarKeyboardHandler,
  persistSidebarOpenState,
} from './sidebar.handlers';
import type {
  SidebarContextProps,
  SidebarProviderProps,
} from './sidebar.types';
import { SidebarContext } from './sidebar-context';

export function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: SidebarProviderProps) {
  const [openMobile, setOpenMobile] = React.useState<boolean>(false);
  const [_open, _setOpen] = React.useState<boolean>(defaultOpen);
  const isMobile = useIsMobile();
  const open = openProp ?? _open;
  const state = open ? SidebarState.Expanded : SidebarState.Collapsed;
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === 'function' ? value(open) : value;

      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }

      persistSidebarOpenState(openState);
    },
    [setOpenProp, open],
  );
  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      setOpenMobile((value) => !value);
      return;
    }

    setOpen((value) => !value);
  }, [isMobile, setOpen]);
  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, toggleSidebar],
  );

  React.useEffect(() => {
    const handleKeyDown = createSidebarKeyboardHandler(toggleSidebar);
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar]);

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        data-slot='sidebar-wrapper'
        style={createSidebarWrapperStyle(style)}
        className={cn(
          'group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

function createSidebarWrapperStyle(style: React.CSSProperties | undefined) {
  const sidebarStyle = {
    '--sidebar-width': SIDEBAR_WIDTH,
    '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
  } as React.CSSProperties;

  return Object.assign(sidebarStyle, style);
}
