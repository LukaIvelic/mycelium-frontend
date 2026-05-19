import type { ReactNode } from 'react';
import { Logs } from './logs/logs';

export enum SheetTab {
  Communication = 'Communication',
  GeneralSettings = 'General Settings',
  Logs = 'Logs',
  PerformanceMetrics = 'Performance Metrics',
}

export const SHEET_EMPTY_VALUE = '';
export const SHEET_INTEGRATION_PREFIX = 'integration:';
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
): Map<string, ReactNode> {
  const logsContent = (
    <Logs key={SheetTab.Logs} integrationId={integrationId} />
  );
  const settingsContent = (
    <div key={SheetTab.GeneralSettings}>Details content</div>
  );
  const performanceContent = (
    <div key={SheetTab.PerformanceMetrics}>Logs content</div>
  );
  const communicationContent = (
    <div key={SheetTab.Communication}>Metrics content</div>
  );

  return new Map([
    [SheetTab.Logs, logsContent],
    [SheetTab.GeneralSettings, settingsContent],
    [SheetTab.PerformanceMetrics, performanceContent],
    [SheetTab.Communication, communicationContent],
  ]);
}
