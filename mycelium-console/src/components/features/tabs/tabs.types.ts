import type { Dispatch, SetStateAction } from 'react';

export interface TabItemProps {
  active?: boolean;
  label: string;
  onClick?: () => void;
}

export interface TabsProps {
  activeTab?: string;
  items: string[];
  setActiveTab?: Dispatch<SetStateAction<string>>;
}

export interface UseTabsProps {
  items: string[];
}
