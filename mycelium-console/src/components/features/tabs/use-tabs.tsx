import { useState } from 'react';
import { Tabs } from './tabs';
import type { UseTabsProps } from './tabs.types';

export function useTabs({ items }: UseTabsProps) {
  const [activeTab, setActiveTab] = useState<string>(items[0]);

  return {
    tabs: (
      <Tabs items={items} activeTab={activeTab} setActiveTab={setActiveTab} />
    ),
    activeTab,
    setActiveTab,
  };
}
