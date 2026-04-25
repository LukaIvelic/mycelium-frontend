'use client';

import { type FocusEvent, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  type?: string;
  ref?: React.Ref<HTMLInputElement | null>;
}

export function Input({
  placeholder,
  className,
  ref,
  type = 'text',
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');

  const hasValue = useMemo(() => {
    return Boolean(rest.value || rest.defaultValue || inputValue);
  }, [rest.value, rest.defaultValue, inputValue]);

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    rest.onFocus?.(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setInputValue(e.target.value);
    rest.onBlur?.(e);
  };

  const isFloating = isFocused || hasValue;

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
