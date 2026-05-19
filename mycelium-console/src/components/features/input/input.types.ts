import type { InputHTMLAttributes, Ref } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  ref?: Ref<HTMLInputElement | null>;
  type?: string;
}
