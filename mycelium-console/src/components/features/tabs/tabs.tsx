import { Separator } from '@/components/ui/separator/separator';
import { cn } from '@/lib/utils';
import { createTabClickHandler } from './tabs.handlers';
import type { TabItemProps, TabsProps } from './tabs.types';

function TabItem({ label, active, onClick }: TabItemProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={cn(
        'px-8 py-2 cursor-pointer rounded-t-lg border-x border-t z-1 transition-all w-full whitespace-nowrap',
        active
          ? 'border-foreground/10 bg-inherit text-foreground'
          : 'border-transparent hover:bg-white/5 text-foreground/50 hover:text-foreground',
      )}
    >
      {label}
    </button>
  );
}

export function Tabs({ items, activeTab, setActiveTab }: TabsProps) {
  return (
    <div className='flex relative items-end bg-inherit'>
      {items.map((item) => {
        const handleTabClick = createTabClickHandler(setActiveTab, item);

        return (
          <TabItem
            key={item}
            label={item}
            active={item === activeTab}
            onClick={handleTabClick}
          />
        );
      })}
      <Separator className='bg-foreground/10 absolute bottom-0 w-fit' />
    </div>
  );
}
