'use client';

import { Centered } from '@/components/features/centered';
import { useTabs } from '@/components/features/tabs';
import { ApiAccess } from '@/components/pages/workspace-settings/tab-content/api-access/api-access';
import { cn } from '@/lib/utils';

export default function Page() {
  const tab_content = new Map<string, React.ReactNode>([
    ['API Access Management', <ApiAccess />],
    ['Region & Localization', <div>Region & Localization Content</div>],
    ['Alert Configuration', <div>Alert Configuration Content</div>],
    [
      'Data Tracing Customization',
      <div>Data Tracing Customization Content</div>,
    ],
    ['Integrations', <div>Integrations Content</div>],
  ]);

  const { activeTab, tabs } = useTabs({
    items: tab_content.keys().toArray(),
  });

  return (
    <Centered>
      <div
        className={cn(
          'grid grid-cols-4 grid-rows-[auto_auto_auto] items-center gap-4',
        )}
      >
        <div className="col-span-2 pb-4">
          <h1 className="text-[32px] font-medium">Workspace Settings</h1>
          <p className="text-foreground/50">
            Manage your workspace preferences and settings
          </p>
        </div>
      </div>
      <div className="col-span-4 row-start-2 w-full bg-[#1d1d1d]">{tabs}</div>
      <div className="col-span-4 row-start-3 pt-12">
        {tab_content.get(activeTab)}
      </div>
    </Centered>
  );
}
