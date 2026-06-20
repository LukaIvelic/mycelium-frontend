import { SettingsTabPanel } from '../_components/settings-tab-panel/settings-tab-panel';
import { regionLocalizationSections } from './region-localization.config';

export function RegionLocalization() {
  return <SettingsTabPanel sections={regionLocalizationSections} />;
}
