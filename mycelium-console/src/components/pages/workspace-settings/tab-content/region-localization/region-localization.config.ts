import type { SettingsTabPanelSection } from '../_components/settings-tab-panel/settings-tab-panel.types';

export const regionLocalizationSections = [
  {
    title: 'Workspace Region',
    description:
      'Default placement and residency settings used when new workspace resources are created.',
    items: [
      {
        label: 'Primary region',
        description: 'Preferred region for new project infrastructure.',
        value: 'EU Central',
        status: 'Default',
      },
      {
        label: 'Data residency',
        description: 'Regional boundary used for retained workspace data.',
        value: 'European Union',
      },
      {
        label: 'Failover region',
        description: 'Secondary location reserved for future failover support.',
        value: 'EU West',
        status: 'Planned',
      },
    ],
  },
  {
    title: 'Localization',
    description:
      'Display preferences for dates, times, currency, and workspace language.',
    items: [
      {
        label: 'Timezone',
        description: 'Used for logs, alerts, and generated reports.',
        value: 'Europe/Zagreb',
      },
      {
        label: 'Date format',
        description: 'Default format shown across the console.',
        value: 'DD/MM/YYYY',
      },
      {
        label: 'Language',
        description: 'Primary language for the workspace interface.',
        value: 'English',
      },
    ],
  },
] satisfies SettingsTabPanelSection[];
