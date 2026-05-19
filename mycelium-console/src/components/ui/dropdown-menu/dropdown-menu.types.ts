import type { Menu as MenuPrimitive } from '@base-ui/react/menu';
import type { ComponentProps } from 'react';

export type DropdownMenuProps = MenuPrimitive.Root.Props;
export type DropdownMenuTriggerProps = MenuPrimitive.Trigger.Props;
export type DropdownMenuItemProps = MenuPrimitive.Item.Props;
export type DropdownMenuSeparatorProps = ComponentProps<
  typeof MenuPrimitive.Separator
>;

export interface DropdownMenuContentProps
  extends MenuPrimitive.Popup.Props,
    Pick<
      MenuPrimitive.Positioner.Props,
      'align' | 'alignOffset' | 'side' | 'sideOffset'
    > {}
