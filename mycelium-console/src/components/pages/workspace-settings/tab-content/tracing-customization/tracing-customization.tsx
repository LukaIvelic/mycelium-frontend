import { SettingsTabPanel } from '../_components/settings-tab-panel/settings-tab-panel';
import { tracingCustomizationSections } from './tracing-customization.config';

export function TracingCustomization() {
  return <SettingsTabPanel sections={tracingCustomizationSections} />;
}
