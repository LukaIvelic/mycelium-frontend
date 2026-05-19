import type { LogDetailKeyValueRowProps } from './logs.types';

export function LogDetailKeyValueRow({
  label,
  children,
}: LogDetailKeyValueRowProps) {
  return (
    <div className='grid grid-cols-[max-content_minmax(0,1fr)] gap-2'>
      <span className='text-sky-300'>{label}</span>
      <div className='min-w-0'>{children}</div>
    </div>
  );
}
