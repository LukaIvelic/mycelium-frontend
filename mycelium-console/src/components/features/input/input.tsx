'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { INPUT_DEFAULT_TYPE } from './input.config';
import {
  createInputBlurHandler,
  createInputFocusHandler,
} from './input.handlers';
import type { InputProps } from './input.types';

export function Input({
  placeholder,
  className,
  ref,
  type = INPUT_DEFAULT_TYPE,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const hasValue = Boolean(rest.value || rest.defaultValue || inputValue);
  const isFloating = isFocused || hasValue;
  const handleFocus = createInputFocusHandler(setIsFocused, rest.onFocus);
  const handleBlur = createInputBlurHandler(
    setInputValue,
    setIsFocused,
    rest.onBlur,
  );

  return (
    <div className={cn(`mycelium-input-wrapper`)}>
      <label
        htmlFor={`input-${placeholder}`}
        className={cn(
          `mycelium-input-label`,
          isFloating && `mycelium-floating`,
        )}
      >
        {placeholder}
      </label>
      <input
        id={`input-${placeholder}`}
        ref={ref}
        type={type}
        {...rest}
        className={cn(`mycelium-input-field`, className)}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
}
