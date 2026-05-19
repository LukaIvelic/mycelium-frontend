import type { Dispatch, SetStateAction } from 'react';

export function createTabClickHandler(
  setActiveTab: Dispatch<SetStateAction<string>> | undefined,
  item: string,
) {
  return function handleTabClick(): void {
    setActiveTab?.(item);
  };
}
