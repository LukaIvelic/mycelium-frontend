import type { ReactNode } from 'react';

export interface SettingsTabPanelProps {
  sections: SettingsTabPanelSection[];
}

export interface SettingsTabPanelSection {
  description: string;
  items: SettingsTabPanelItem[];
  title: string;
}

export interface SettingsTabPanelItem {
  description: string;
  label: string;
  status?: string;
  value: ReactNode;
}

export interface SettingsSectionProps {
  children?: ReactNode;
  description: string;
  title: string;
}

export interface SettingsRowProps {
  children: ReactNode;
  description: string;
  label: string;
  status?: string;
}
