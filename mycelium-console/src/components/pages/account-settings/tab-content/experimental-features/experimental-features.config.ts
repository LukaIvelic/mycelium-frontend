import type { SettingsTabPanelSection } from '../_components/settings-tab-panel/settings-tab-panel.types';

export const experimentalFeaturesSections = [
  {
    title: 'Preview Access',
    description:
      'Early account-level features that can be enabled before general release.',
    items: [
      {
        label: 'Graph layout preview',
        description: 'Try upcoming dependency graph positioning behavior.',
        value: 'Disabled',
      },
      {
        label: 'Trace replay',
        description: 'Preview recorded request paths from historical traces.',
        value: 'Disabled',
        status: 'Preview',
      },
      {
        label: 'Command palette',
        description: 'Access account and workspace actions from one launcher.',
        value: 'Enabled',
      },
    ],
  },
  {
    title: 'Feedback',
    description:
      'Preferences for collecting feedback while preview features are active.',
    items: [
      {
        label: 'Usage diagnostics',
        description: 'Send anonymous interaction events for preview features.',
        value: 'Enabled',
      },
      {
        label: 'Feature surveys',
        description: 'Receive short feedback prompts after using previews.',
        value: 'Disabled',
      },
      {
        label: 'Beta announcements',
        description:
          'Notify this account when a new preview becomes available.',
        value: 'Enabled',
      },
    ],
  },
] satisfies SettingsTabPanelSection[];
