import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import type * as React from 'react';

export type ComboboxValueProps = ComboboxPrimitive.Value.Props;
export type ComboboxTriggerProps = ComboboxPrimitive.Trigger.Props;
export type ComboboxClearProps = ComboboxPrimitive.Clear.Props;
export type ComboboxListProps = ComboboxPrimitive.List.Props;
export type ComboboxItemProps = ComboboxPrimitive.Item.Props;
export type ComboboxGroupProps = ComboboxPrimitive.Group.Props;
export type ComboboxLabelProps = ComboboxPrimitive.GroupLabel.Props;
export type ComboboxCollectionProps = ComboboxPrimitive.Collection.Props;
export type ComboboxEmptyProps = ComboboxPrimitive.Empty.Props;
export type ComboboxSeparatorProps = ComboboxPrimitive.Separator.Props;
export type ComboboxChipsInputProps = ComboboxPrimitive.Input.Props;

export interface ComboboxInputProps extends ComboboxPrimitive.Input.Props {
  showClear?: boolean;
  showTrigger?: boolean;
}

export interface ComboboxContentProps
  extends ComboboxPrimitive.Popup.Props,
    Pick<
      ComboboxPrimitive.Positioner.Props,
      'side' | 'align' | 'sideOffset' | 'alignOffset' | 'anchor'
    > {}

export interface ComboboxChipsProps
  extends React.ComponentPropsWithRef<typeof ComboboxPrimitive.Chips>,
    ComboboxPrimitive.Chips.Props {}

export interface ComboboxChipProps extends ComboboxPrimitive.Chip.Props {
  showRemove?: boolean;
}
