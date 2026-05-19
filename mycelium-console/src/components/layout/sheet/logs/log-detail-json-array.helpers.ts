import type { JsonValue } from './logs.types';

export function createJsonArrayItemKey(item: JsonValue, index: number): string {
  const itemSignature = JSON.stringify(item);
  return `${itemSignature}-${index}`;
}

export function createJsonArrayItemLabel(index: number): string {
  return `[${index}]`;
}
