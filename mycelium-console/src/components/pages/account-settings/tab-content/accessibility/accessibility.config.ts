import type { SettingsTabPanelSection } from '../_components/settings-tab-panel/settings-tab-panel.types';

export const accessibilitySections = [
  {
    title: 'Interface Preferences',
    description:
      'Personal display defaults for reducing visual friction in the console.',
    items: [
      {
        label: 'Reduced motion',
        description: 'Minimize non-essential animation and transitions.',
        value: 'System default',
      },
      {
        label: 'Contrast preference',
        description: 'Increase separation between text, borders, and panels.',
        value: 'Standard',
      },
      {
        label: 'Focus indicators',
        description: 'Show visible outlines while navigating with keyboard.',
        value: 'Enabled',
        status: 'Default',
      },
    ],
  },
  {
    title: 'Reading',
    description:
      'Static preferences for text density and assistive descriptions.',
    items: [
      {
        label: 'Text density',
        description: 'Adjust information density across settings pages.',
        value: 'Comfortable',
      },
      {
        label: 'Screen reader labels',
        description: 'Prefer explicit labels for icon-only controls.',
        value: 'Enabled',
      },
      {
        label: 'Keyboard shortcuts',
        description: 'Use keyboard-first navigation for common actions.',
        value: 'Enabled',
      },
    ],
  },
] satisfies SettingsTabPanelSection[];
