import { LogDetailJsonValue } from './log-detail-json-value';
import type { JsonValue, LogDetailBodyContentProps } from './logs.types';

export function LogDetailBodyContent({ body }: LogDetailBodyContentProps) {
  const parsedBody = parseLogBody(body);

  if (parsedBody === undefined) {
    return (
      <pre className='p-2 font-mono text-xs whitespace-pre-wrap break-words text-emerald-300'>
        {body}
      </pre>
    );
  }

  return (
    <div className='grid gap-1 p-2 font-mono text-xs'>
      <LogDetailJsonValue value={parsedBody} />
    </div>
  );
}

function parseLogBody(body: string): JsonValue | undefined {
  try {
    return JSON.parse(body) as JsonValue;
  } catch {
    return undefined;
  }
}
