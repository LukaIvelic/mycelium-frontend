import type { SettingsTabPanelSection } from '../_components/settings-tab-panel/settings-tab-panel.types';

export const tracingCustomizationSections = [
  {
    title: 'Trace Collection',
    description:
      'Static defaults for how traces are sampled, retained, and displayed.',
    items: [
      {
        label: 'Sampling mode',
        description: 'Collection strategy used for new services.',
        value: 'Adaptive',
        status: 'Default',
      },
      {
        label: 'Trace retention',
        description: 'How long trace data remains visible in the console.',
        value: '14 days',
      },
      {
        label: 'Error traces',
        description: 'Always retain traces for failed requests.',
        value: 'Enabled',
      },
    ],
  },
  {
    title: 'Display Preferences',
    description:
      'Workspace conventions for trace naming and sensitive field handling.',
    items: [
      {
        label: 'Span naming',
        description: 'Format used for service and operation labels.',
        value: 'Service / Operation',
      },
      {
        label: 'Sensitive fields',
        description: 'Mask tokens, passwords, and authorization headers.',
        value: 'Redacted',
        status: 'Protected',
      },
      {
        label: 'Dependency map',
        description: 'Show inferred service relationships in trace views.',
        value: 'Enabled',
      },
    ],
  },
] satisfies SettingsTabPanelSection[];
