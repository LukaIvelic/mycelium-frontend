import { SHEET_EMPTY_VALUE } from './sheet.config';
import type { SheetServiceDetails } from './sheet.types';

export function syncSheetServiceDetails(
  data: SheetServiceDetails | undefined,
  setServiceName: (name: string) => void,
  setServiceDescription: (description: string) => void,
): void {
  if (!data) {
    setServiceName(SHEET_EMPTY_VALUE);
    setServiceDescription(SHEET_EMPTY_VALUE);
    return;
  }

  setServiceName(data.name);
  setServiceDescription(data.description ?? SHEET_EMPTY_VALUE);
}
