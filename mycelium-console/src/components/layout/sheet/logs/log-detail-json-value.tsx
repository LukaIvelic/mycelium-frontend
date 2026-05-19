import {
  createJsonArrayItemKey,
  createJsonArrayItemLabel,
} from './log-detail-json-array.helpers';
import { LogDetailKeyValueRow } from './log-detail-key-value-row';
import type {
  JsonValue,
  LogDetailJsonValueProps,
  LogDetailPrimitiveValueProps,
} from './logs.types';

export function LogDetailJsonValue({ value }: LogDetailJsonValueProps) {
  if (Array.isArray(value)) {
    return <LogDetailJsonArray value={value} />;
  }

  if (value !== null && typeof value === 'object') {
    return <LogDetailJsonObject value={value} />;
  }

  return <LogDetailPrimitiveValue value={value} />;
}

function LogDetailJsonArray({ value }: LogDetailJsonValueProps) {
  if (!Array.isArray(value)) {
    return null;
  }

  if (value.length === 0) {
    return <EmptyJsonArray />;
  }

  return <JsonArrayItems value={value} />;
}

function LogDetailJsonObject({ value }: LogDetailJsonValueProps) {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }

  const entries = Object.entries(value);

  if (entries.length === 0) {
    return <EmptyJsonObject />;
  }

  return (
    <div className='grid gap-1'>
      {entries.map(([key, nestedValue]) => (
        <LogDetailKeyValueRow key={key} label={key}>
          <LogDetailJsonValue value={nestedValue} />
        </LogDetailKeyValueRow>
      ))}
    </div>
  );
}

function LogDetailPrimitiveValue({ value }: LogDetailPrimitiveValueProps) {
  if (typeof value === 'string') {
    return (
      <span className='min-w-0 wrap-break-word text-emerald-300'>{value}</span>
    );
  }

  if (typeof value === 'number') {
    return <span className='text-amber-300'>{value}</span>;
  }

  if (typeof value === 'boolean') {
    return <span className='text-violet-300'>{String(value)}</span>;
  }

  return <span className='text-foreground/40'>null</span>;
}

function EmptyJsonArray() {
  return <span className='text-foreground/40'>[]</span>;
}

function EmptyJsonObject() {
  return <span className='text-foreground/40'>{'{}'}</span>;
}

function JsonArrayItems({ value }: { value: JsonValue[] }) {
  return (
    <div className='grid gap-1'>
      {value.map((item, index) => {
        const itemKey = createJsonArrayItemKey(item, index);
        const itemLabel = createJsonArrayItemLabel(index);

        return (
          <LogDetailKeyValueRow key={itemKey} label={itemLabel}>
            <LogDetailJsonValue value={item} />
          </LogDetailKeyValueRow>
        );
      })}
    </div>
  );
}
