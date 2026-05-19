'use client';

import { Menu as MenuPrimitive } from '@base-ui/react/menu';
import { cn } from '@/lib/utils';
import {
  DROPDOWN_MENU_DEFAULT_ALIGN,
  DROPDOWN_MENU_DEFAULT_ALIGN_OFFSET,
  DROPDOWN_MENU_DEFAULT_SIDE,
  DROPDOWN_MENU_DEFAULT_SIDE_OFFSET,
} from './dropdown-menu.config';
import type {
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuProps,
  DropdownMenuSeparatorProps,
  DropdownMenuTriggerProps,
} from './dropdown-menu.types';

function DropdownMenu({ ...props }: DropdownMenuProps) {
  return <MenuPrimitive.Root data-slot='dropdown-menu' {...props} />;
}

function DropdownMenuTrigger({ ...props }: DropdownMenuTriggerProps) {
  return <MenuPrimitive.Trigger data-slot='dropdown-menu-trigger' {...props} />;
}

function DropdownMenuContent({
  className,
  side = DROPDOWN_MENU_DEFAULT_SIDE,
  sideOffset = DROPDOWN_MENU_DEFAULT_SIDE_OFFSET,
  align = DROPDOWN_MENU_DEFAULT_ALIGN,
  alignOffset = DROPDOWN_MENU_DEFAULT_ALIGN_OFFSET,
  ...props
}: DropdownMenuContentProps) {
  return (
    <MenuPrimitive.Portal data-slot='dropdown-menu-portal'>
      <MenuPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className='z-50 outline-hidden'
      >
        <MenuPrimitive.Popup
          data-slot='dropdown-menu-content'
          className={cn(
            'z-50 min-w-40 origin-(--transform-origin) overflow-hidden rounded-xl border border-foreground/10 bg-[#1f1f1f] p-1.5 text-sm text-foreground shadow-lg outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
            className,
          )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

function DropdownMenuItem({ className, ...props }: DropdownMenuItemProps) {
  return (
    <MenuPrimitive.Item
      data-slot='dropdown-menu-item'
      className={cn(
        'flex min-h-9 cursor-default items-center gap-2 rounded-lg px-2.5 py-2 text-[0.925rem] text-foreground/90 outline-hidden select-none transition-colors data-highlighted:bg-white/5 data-highlighted:text-foreground data-disabled:pointer-events-none data-disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: DropdownMenuSeparatorProps) {
  return (
    <MenuPrimitive.Separator
      data-slot='dropdown-menu-separator'
      className={cn('-mx-0.5 my-1 h-px bg-foreground/10', className)}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
};
