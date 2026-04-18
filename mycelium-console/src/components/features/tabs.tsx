import { useState } from "react";
import { Separator } from "../ui/separator";

interface TabItemProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function TabItem({ label, active, onClick }: TabItemProps) {
  return (
    <div
      onClick={onClick}
      className={`px-8 py-2 cursor-pointer rounded-t-lg border-x border-t z-1 transition-all ${
        active
          ? "border-foreground/10 bg-[#1d1d1d] text-foreground"
          : "border-transparent hover:bg-muted text-foreground/50 hover:text-foreground"
      }`}
    >
      {label}
    </div>
  );
}

interface TabsProps {
  items: string[];
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export function Tabs({ items, activeTab, setActiveTab }: TabsProps) {
  return (
    <div className="flex relative w-fit items-end">
      <Separator className="bg-foreground/10 absolute bottom-0 w-fit" />
      {items.map((item) => (
        <TabItem
          key={item}
          label={item}
          active={item === activeTab}
          onClick={() => setActiveTab?.(item)}
        />
      ))}
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
