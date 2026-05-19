'use client';

import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTabs } from '@/components/features/tabs';
import { Button } from '@/components/ui/button';
import { useServices } from '@/hooks/use-services.hook';
import { useSheet } from '@/hooks/use-sheet.hook';
import { cn } from '@/lib/utils';
import {
  createSheetTabContent,
  getSheetServiceId,
  SHEET_EMPTY_VALUE,
  SHEET_TABS,
} from './sheet.config';
import { syncSheetServiceDetails } from './sheet.handlers';

export function Sheet() {
  const [serviceName, setServiceName] = useState<string>(SHEET_EMPTY_VALUE);
  const [serviceDescription, setServiceDescription] =
    useState<string>(SHEET_EMPTY_VALUE);

  const { open, closeSheet, data: id } = useSheet();
  const integrationId = getSheetServiceId(id) ?? SHEET_EMPTY_VALUE;
  const tabsContent = createSheetTabContent(integrationId);
  const { tabs, activeTab } = useTabs({
    items: SHEET_TABS,
  });
  const { useFindById } = useServices();
  const serviceId = getSheetServiceId(id);
  const { data } = useFindById(serviceId || null);

  useEffect(() => {
    syncSheetServiceDetails(data, setServiceName, setServiceDescription);
  }, [data]);

  return (
    <div
      className={cn(
        'absolute top-4 right-4 z-100',
        'h-[calc(100%-32px)] w-[35vw] min-w-150 p-10',
        'border border-foreground/10 rounded-lg bg-[#252525]',
        'transition-all duration-300 ease-in-out',
        'flex flex-col gap-8 overflow-y-hidden',
        open ? 'translate-x-0' : 'translate-x-[110%]',
      )}
    >
      <div className='grid grid-cols-[1fr_auto] gap-4 w-full'>
        <div>
          <div className='text-[20px] font-medium'>{serviceName}</div>
          <div className='text-sm text-foreground/65 mt-2'>
            {serviceDescription}
          </div>
        </div>
        <Button
          className='w-fit p-1 aspect-square hover:cursor-pointer'
          variant='ghost'
          onClick={closeSheet}
        >
          <X />
        </Button>
      </div>

      <div className='bg-inherit'>{tabs}</div>

      <div className='grid gap-6 max-h-full overflow-y-auto no-scrollbar'>
        {tabsContent.get(activeTab)}
      </div>
    </div>
  );
}
