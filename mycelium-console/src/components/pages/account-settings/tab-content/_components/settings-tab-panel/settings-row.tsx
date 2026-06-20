import type { SettingsRowProps } from './settings-tab-panel.types';

export function SettingsRow({
  children,
  description,
  label,
  status,
}: SettingsRowProps) {
  return (
    <div className='grid grid-cols-1 gap-3 py-4 first:pt-0 last:pb-0 md:grid-cols-[minmax(0,1fr)_auto] md:gap-8'>
      <div>
        <p className='text-sm font-medium'>{label}</p>
        <p className='mt-1 text-sm text-foreground/50'>{description}</p>
      </div>
      <div className='flex items-center gap-3 text-sm md:justify-end'>
        {status && (
          <span className='rounded-sm border border-foreground/10 px-2 py-1 text-foreground/50'>
            {status}
          </span>
        )}
        <div className='font-medium text-foreground'>{children}</div>
      </div>
    </div>
  );
}
