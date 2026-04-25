'use client';

import { X } from 'lucide-react';
import { type ReactNode, useEffect, useState } from 'react';
import { useTabs } from '@/components/features/tabs';
import { Button } from '@/components/ui/button';
import { useServices } from '@/hooks/use-services.hook';
import { useSheet } from '@/hooks/use-sheet.hook';
import { cn } from '@/lib/utils';

export function Sheet() {
  const tabs_content: Map<string, ReactNode> = new Map([
    ['General Settings', <div key="1">Details content</div>],
    ['Performance Metrics', <div key="2">Logs content</div>],
    ['Communication', <div key="3">Metrics content</div>],
    ['Payload Details', <div key="4">Traces content</div>],
  ]);

  const [serviceName, setServiceName] = useState<string>('');
  const [serviceDescription, setServiceDescription] = useState<string>('');

  const { open, closeSheet, data: id } = useSheet();
  const { tabs, activeTab } = useTabs({
    items: tabs_content.keys().toArray(),
  });
  const { useFindById } = useServices();
  const { data } = useFindById(String(id ?? '').replace('service:', '') ?? '');

  useEffect(() => {
    if (!data) return;

    setServiceName(data.service_name);
    setServiceDescription(data.service_description ?? '');
  }, [data]);

  return (
    <div
      className={cn(
        'absolute top-4 right-4 z-100',
        'h-[calc(100%-32px)] w-[35vw] min-w-150 p-10',
        'border border-foreground/10 rounded-lg bg-[#252525]',
        'transition-all duration-300 ease-in-out',
        'flex flex-col gap-8 overflow-y-auto',
        open ? 'translate-x-0' : 'translate-x-[110%]',
      )}
    >
      <div className="grid grid-cols-[1fr_auto] gap-4 w-full">
        <div>
          <div className="text-[20px] font-medium">{serviceName}</div>
          <div className="text-sm text-foreground/65 mt-2">
            {serviceDescription}
          </div>
        </div>
        <Button
          className="w-fit p-1 aspect-square hover:cursor-pointer"
          variant="ghost"
          onClick={closeSheet}
        >
          <X />
        </Button>
      </div>

      <div className="bg-inherit">{tabs}</div>

      <div className="grid gap-6">{activeTab}</div>
    </div>
  );
}
