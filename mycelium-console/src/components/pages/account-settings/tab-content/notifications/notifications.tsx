import { SettingsTabPanel } from '../_components/settings-tab-panel/settings-tab-panel';
import { notificationsSections } from './notifications.config';

export function Notifications() {
  return <SettingsTabPanel sections={notificationsSections} />;
}
