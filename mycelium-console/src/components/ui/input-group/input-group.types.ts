import type { VariantProps } from 'class-variance-authority';
import type * as React from 'react';
import type { Button } from '@/components/ui/button/button';
import type {
  inputGroupAddonVariants,
  inputGroupButtonVariants,
} from './input-group.variants';

export type InputGroupProps = React.ComponentProps<'fieldset'>;
export type InputGroupTextProps = React.ComponentProps<'span'>;
export type InputGroupInputProps = React.ComponentProps<'input'>;
export type InputGroupTextareaProps = React.ComponentProps<'textarea'>;

export interface InputGroupAddonProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof inputGroupAddonVariants> {}

export interface InputGroupButtonProps
  extends Omit<React.ComponentProps<typeof Button>, 'size' | 'type'>,
    VariantProps<typeof inputGroupButtonVariants> {
  type?: 'button' | 'submit' | 'reset';
}
