import type { ReactNode } from 'react';
import type { Service } from '@/api/services/services/services-service.types';
import { Logs } from './logs/logs';
import {
  Communication,
  GeneralSettings,
  PerformanceMetrics,
} from './service-details';

export enum SheetTab {
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

interface SheetPayload {
  focusedLogId?: unknown;
  serviceId?: unknown;
}

export function getSheetServiceId(payload: unknown): string | null {
  const selectedId = getSheetPayloadServiceId(payload);

  if (!selectedId.startsWith(SHEET_INTEGRATION_PREFIX)) {
    return null;
  }

  return selectedId.replace(SHEET_INTEGRATION_PREFIX, SHEET_EMPTY_VALUE).trim();
}

export function getSheetFocusedLogId(payload: unknown): string | null {
  if (!isSheetPayload(payload) || typeof payload.focusedLogId !== 'string') {
    return null;
  }

  return payload.focusedLogId;
}

export function createSheetTabContent(
  integrationId: string,
  focusedLogId: string | null,
  onDismissFocusedLog: () => void,
  service: Service | undefined,
  isServiceLoading: boolean,
): Map<string, ReactNode> {
  const logsContent = (
    <Logs
      key={SheetTab.Logs}
      focusedLogId={focusedLogId}
      integrationId={integrationId}
      onDismissFocusedLog={onDismissFocusedLog}
    />
  );
  const settingsContent = (
    <GeneralSettings
      key={SheetTab.GeneralSettings}
      integrationId={integrationId}
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

function getSheetPayloadServiceId(payload: unknown): string {
  if (isSheetPayload(payload) && typeof payload.serviceId === 'string') {
    return payload.serviceId;
  }

  return String(payload ?? SHEET_EMPTY_VALUE);
}

function isSheetPayload(payload: unknown): payload is SheetPayload {
  return typeof payload === 'object' && payload !== null;
}
