"use client";

import { cn } from "@/lib/utils";
import { useState, useMemo, FocusEvent } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  type?: string;
  ref?: React.Ref<HTMLInputElement | null>;
}

export function Input({
  placeholder,
  className,
  ref,
  type = "text",
  value,
  defaultValue,
  onFocus,
  onBlur,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");

  const hasValue = useMemo(() => {
    return Boolean(value || defaultValue || inputValue);
  }, [value, defaultValue, inputValue]);

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setInputValue(e.target.value);
    onBlur?.(e);
  };

  const isFloating = isFocused || hasValue;

  return (
    <div className={cn(`mycelium-input-wrapper`)}>
      <label
        htmlFor={"input-" + placeholder}
        className={cn(
          `mycelium-input-label`,
          isFloating && `mycelium-floating`,
        )}
      >
        {placeholder}
      </label>
      <input
        id={"input-" + placeholder}
        className={cn(`mycelium-input-field`, className)}
        ref={ref}
        type={type}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        defaultValue={defaultValue}
        {...rest}
      />
    </div>
  );
}
