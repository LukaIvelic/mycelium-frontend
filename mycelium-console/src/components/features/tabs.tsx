import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';

interface TabItemProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function TabItem({
  label,
  active,
  onClick,
}: TabItemProps & { className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'px-8 py-2 cursor-pointer rounded-t-lg border-x border-t z-1 transition-all',
        active
          ? 'border-foreground/10 bg-inherit text-foreground'
          : 'border-transparent hover:bg-white/5 text-foreground/50 hover:text-foreground',
      )}
    >
      {label}
    </button>
  );
}

interface TabsProps {
  items: string[];
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

function Tabs({ items, activeTab, setActiveTab }: TabsProps) {
  return (
    <div className="flex relative items-end bg-inherit">
      {items.map((item) => (
        <TabItem
          key={item}
          label={item}
          active={item === activeTab}
          onClick={() => setActiveTab?.(item)}
        />
      ))}
      <Separator className="bg-foreground/10 absolute bottom-0 w-fit" />
    </div>
  );
}

export function useTabs({ items }: TabsProps) {
  const [activeTab, setActiveTab] = useState<string>(items[0]);

  return {
    tabs: (
      <Tabs items={items} activeTab={activeTab} setActiveTab={setActiveTab} />
    ),
    activeTab,
  };
}
