import type { SettingsRowProps } from './settings-tab-panel.types';

export function SettingsRow({ item }: SettingsRowProps) {
  return (
    <div className='grid grid-cols-1 gap-3 py-4 first:pt-0 last:pb-0 md:grid-cols-[minmax(0,1fr)_auto] md:gap-8'>
      <div>
        <p className='text-sm font-medium'>{item.label}</p>
        <p className='mt-1 text-sm text-foreground/50'>{item.description}</p>
      </div>
      <div className='flex items-center gap-3 text-sm md:justify-end'>
        {item.status && (
          <span className='rounded-sm border border-foreground/10 px-2 py-1 text-foreground/50'>
            {item.status}
          </span>
        )}
        <span className='font-medium text-foreground'>{item.value}</span>
      </div>
    </div>
  );
}
