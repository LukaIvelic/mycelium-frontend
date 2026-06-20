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
  value: string;
}

export interface SettingsSectionProps {
  section: SettingsTabPanelSection;
}

export interface SettingsRowProps {
  item: SettingsTabPanelItem;
}
