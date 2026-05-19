import type * as React from 'react';

export function handleInputGroupAddonClick(
  event: React.MouseEvent<HTMLFieldSetElement>,
): void {
  if (isButtonTarget(event.target)) {
    return;
  }

  focusInput(event.currentTarget);
}

export function handleInputGroupAddonKeyDown(
  event: React.KeyboardEvent<HTMLFieldSetElement>,
): void {
  if (!isActivationKey(event.key) || isButtonTarget(event.target)) {
    return;
  }

  focusInput(event.currentTarget);
}

function focusInput(element: HTMLElement): void {
  element.parentElement?.querySelector('input')?.focus();
}

function isButtonTarget(target: EventTarget): boolean {
  return Boolean((target as HTMLElement).closest('button'));
}

function isActivationKey(key: string): boolean {
  return key === 'Enter' || key === ' ';
}
