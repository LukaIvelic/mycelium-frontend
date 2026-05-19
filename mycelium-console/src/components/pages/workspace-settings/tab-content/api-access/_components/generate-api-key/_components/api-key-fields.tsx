import { cn } from '@/lib/utils';
import {
  API_KEY_FIELD_LABEL_ROW,
  API_KEY_FIELD_VALUE_ROW,
  getApiKeyFieldStyle,
} from '../generate-api-key.config';
import type { ApiKeyFieldsProps } from '../generate-api-key.types';

export function ApiKeyFields({ fields }: ApiKeyFieldsProps) {
  return (
    <>
      {fields.map((field, index) => {
        const fieldStyle = getApiKeyFieldStyle(index, API_KEY_FIELD_LABEL_ROW);

        return (
          <p
            key={`label-${field.label}`}
            style={fieldStyle}
            className={cn('text-foreground/50', 'text-sm font-medium')}
          >
            {field.label}
          </p>
        );
      })}

      {fields.map((field, index) => {
        const fieldStyle = getApiKeyFieldStyle(index, API_KEY_FIELD_VALUE_ROW);

        return (
          <p
            key={`value-${field.label}`}
            style={fieldStyle}
            className={cn('text-sm font-medium')}
          >
            {field.value}
          </p>
        );
      })}
    </>
  );
}
