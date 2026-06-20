import { SettingsSection } from './settings-section';
import type { SettingsTabPanelProps } from './settings-tab-panel.types';

export function SettingsTabPanel({ sections }: SettingsTabPanelProps) {
  return (
    <div className='flex w-full flex-col gap-8'>
      {sections.map((section) => (
        <SettingsSection key={section.title} section={section} />
      ))}
    </div>
  );
}
