import type { Dispatch, FocusEvent, SetStateAction } from 'react';
import type { InputProps } from './input.types';

export function createInputFocusHandler(
  setIsFocused: Dispatch<SetStateAction<boolean>>,
  onFocus: InputProps['onFocus'],
) {
  return function handleFocus(event: FocusEvent<HTMLInputElement>): void {
    setIsFocused(true);
    onFocus?.(event);
  };
}

export function createInputBlurHandler(
  setInputValue: Dispatch<SetStateAction<string>>,
  setIsFocused: Dispatch<SetStateAction<boolean>>,
  onBlur: InputProps['onBlur'],
) {
  return function handleBlur(event: FocusEvent<HTMLInputElement>): void {
    setIsFocused(false);
    setInputValue(event.target.value);
    onBlur?.(event);
  };
}
