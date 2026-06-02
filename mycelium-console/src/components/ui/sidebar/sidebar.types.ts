import type { useRender } from '@base-ui/react/use-render';
import type { VariantProps } from 'class-variance-authority';
import type * as React from 'react';
import type { Button } from '@/components/ui/button/button';
import type { Input } from '@/components/ui/input/input';
import type { Separator } from '@/components/ui/separator/separator';
import type { TooltipContent } from '@/components/ui/tooltip/tooltip';
import type { SidebarState } from './sidebar.constants';
import type { sidebarMenuButtonVariants } from './sidebar-menu-button/sidebar-menu-button.variants';

export interface SidebarContextProps {
  isMobile: boolean;
  open: boolean;
  openMobile: boolean;
  setOpen: (open: boolean | ((value: boolean) => boolean)) => void;
  setOpenMobile: (open: boolean) => void;
  state: SidebarState;
  toggleSidebar: () => void;
}

export interface SidebarProviderProps extends React.ComponentProps<'div'> {
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
}

export interface SidebarProps extends React.ComponentProps<'div'> {
  collapsible?: 'offcanvas' | 'icon' | 'none';
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
}

export type SidebarTriggerProps = React.ComponentProps<typeof Button>;
export type SidebarRailProps = React.ComponentProps<'button'>;
export type SidebarInsetProps = React.ComponentProps<'main'>;
export type SidebarInputProps = React.ComponentProps<typeof Input>;
export type SidebarHeaderProps = React.ComponentProps<'div'>;
export type SidebarFooterProps = React.ComponentProps<'div'>;
export type SidebarSeparatorProps = React.ComponentProps<typeof Separator>;
export type SidebarContentProps = React.ComponentProps<'div'>;
export type SidebarGroupProps = React.ComponentProps<'div'>;
export type SidebarGroupContentProps = React.ComponentProps<'div'>;
export type SidebarMenuProps = React.ComponentProps<'ul'>;
export type SidebarMenuItemProps = React.ComponentProps<'li'>;
export type SidebarMenuBadgeProps = React.ComponentProps<'div'>;
export type SidebarMenuSubProps = React.ComponentProps<'ul'>;
export type SidebarMenuSubItemProps = React.ComponentProps<'li'>;

export type SidebarRenderDivProps = useRender.ComponentProps<'div'> &
  React.ComponentProps<'div'>;

export type SidebarRenderButtonProps = useRender.ComponentProps<'button'> &
  React.ComponentProps<'button'>;

export interface SidebarMenuButtonProps
  extends useRender.ComponentProps<'button'>,
    React.ComponentProps<'button'>,
    VariantProps<typeof sidebarMenuButtonVariants> {
  isActive?: boolean;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
}

export interface SidebarMenuActionProps extends SidebarRenderButtonProps {
  showOnHover?: boolean;
}

export interface SidebarMenuSkeletonProps extends React.ComponentProps<'div'> {
  showIcon?: boolean;
}

export interface SidebarMenuSubButtonProps
  extends useRender.ComponentProps<'a'>,
    React.ComponentProps<'a'> {
  isActive?: boolean;
  size?: 'sm' | 'md';
}
