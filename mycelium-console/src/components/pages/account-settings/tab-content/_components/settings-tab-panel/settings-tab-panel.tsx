import { SettingsRow } from './settings-row';
import { SettingsSection } from './settings-section';
import type { SettingsTabPanelProps } from './settings-tab-panel.types';

export function SettingsTabPanel({ sections }: SettingsTabPanelProps) {
  return (
    <div className='flex w-full flex-col gap-8'>
      {sections.map((section) => (
        <SettingsSection
          key={section.title}
          title={section.title}
          description={section.description}
        >
          {section.items.map((item) => (
            <SettingsRow
              key={item.label}
              label={item.label}
              description={item.description}
              status={item.status}
            >
              {item.value}
            </SettingsRow>
          ))}
        </SettingsSection>
      ))}
    </div>
  );
}
