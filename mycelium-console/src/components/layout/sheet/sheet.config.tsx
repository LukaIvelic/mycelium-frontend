import type { ReactNode } from 'react';
import type { Service } from '@/api/services/services/services-service.types';
import { Logs } from './logs/logs';
import {
  Communication,
  GeneralSettings,
  PerformanceMetrics,
} from './service-details';

enum SheetTab {
  Communication = 'Communication',
  GeneralSettings = 'General Settings',
  Logs = 'Logs',
  PerformanceMetrics = 'Performance',
}

const SHEET_INTEGRATION_PREFIX = 'integration:';
export const SHEET_EMPTY_VALUE = '';
export const SHEET_TABS = [
  SheetTab.Logs,
  SheetTab.GeneralSettings,
  SheetTab.PerformanceMetrics,
  SheetTab.Communication,
];

export function getSheetServiceId(id: unknown): string | null {
  const selectedId = String(id ?? SHEET_EMPTY_VALUE);

  if (!selectedId.startsWith(SHEET_INTEGRATION_PREFIX)) {
    return null;
  }

  return selectedId.replace(SHEET_INTEGRATION_PREFIX, SHEET_EMPTY_VALUE).trim();
}

export function createSheetTabContent(
  integrationId: string,
  service: Service | undefined,
  isServiceLoading: boolean,
): Map<string, ReactNode> {
  const logsContent = (
    <Logs key={SheetTab.Logs} integrationId={integrationId} />
  );
  const settingsContent = (
    <GeneralSettings
      key={SheetTab.GeneralSettings}
      service={service}
      isLoading={isServiceLoading}
    />
  );
  const performanceContent = (
    <PerformanceMetrics
      key={SheetTab.PerformanceMetrics}
      integrationId={integrationId}
    />
  );
  const communicationContent = (
    <Communication
      key={SheetTab.Communication}
      integrationId={integrationId}
      service={service}
    />
  );

  return new Map([
    [SheetTab.Logs, logsContent],
    [SheetTab.GeneralSettings, settingsContent],
    [SheetTab.PerformanceMetrics, performanceContent],
    [SheetTab.Communication, communicationContent],
  ]);
}
