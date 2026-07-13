'use client';

import { X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useTabs } from '@/components/features/tabs/use-tabs';
import { Button } from '@/components/ui/button/button';
import { Skeleton } from '@/components/ui/skeleton/skeleton';
import { useServices } from '@/hooks/use-services.hook';
import { useSheet } from '@/hooks/use-sheet.hook';
import { cn } from '@/lib/utils';
import {
  createSheetTabContent,
  getSheetFocusedLogId,
  getSheetServiceId,
  SHEET_EMPTY_VALUE,
  SHEET_TABS,
  SheetTab,
} from './sheet.config';
import { syncSheetServiceDetails } from './sheet.handlers';

export function Sheet() {
  const [serviceName, setServiceName] = useState<string>(SHEET_EMPTY_VALUE);
  const [serviceDescription, setServiceDescription] =
    useState<string>(SHEET_EMPTY_VALUE);

  const { open, closeSheet, data: id } = useSheet();
  const integrationId = getSheetServiceId(id) ?? SHEET_EMPTY_VALUE;
  const rawFocusedLogId = getSheetFocusedLogId(id);
  const [dismissedFocusedLogId, setDismissedFocusedLogId] = useState<
    string | null
  >(null);
  const focusedLogId =
    rawFocusedLogId === dismissedFocusedLogId ? null : rawFocusedLogId;
  const dismissFocusedLog = useCallback(() => {
    if (rawFocusedLogId) {
      setDismissedFocusedLogId(rawFocusedLogId);
    }
  }, [rawFocusedLogId]);
  const { tabs, activeTab, setActiveTab } = useTabs({
    items: SHEET_TABS,
  });
  const { useFindById } = useServices();
  const serviceId = getSheetServiceId(id);
  const { data, isLoading } = useFindById(serviceId || null);
  const tabsContent = createSheetTabContent(
    integrationId,
    focusedLogId,
    dismissFocusedLog,
    data,
    isLoading,
  );

  useEffect(() => {
    syncSheetServiceDetails(data, setServiceName, setServiceDescription);
  }, [data]);

  useEffect(() => {
    setDismissedFocusedLogId(null);

    if (rawFocusedLogId) {
      setActiveTab(SheetTab.Logs);
    }
  }, [rawFocusedLogId, setActiveTab]);

  useEffect(() => {
    if (rawFocusedLogId && activeTab !== SheetTab.Logs) {
      setDismissedFocusedLogId(rawFocusedLogId);
    }
  }, [activeTab, rawFocusedLogId]);

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
          {isLoading ? (
            <Skeleton className='h-6 w-40' />
          ) : (
            <div className='text-[20px] font-medium'>{serviceName}</div>
          )}
          {isLoading ? (
            <Skeleton className='mt-2 h-4 w-64' />
          ) : (
            <div className='text-sm text-foreground/65 mt-2'>
              {serviceDescription}
            </div>
          )}
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
