const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;
const SIDEBAR_COOKIE_DAYS = 7;

export const SIDEBAR_COOKIE_NAME = 'sidebar_state';
export const SIDEBAR_COOKIE_MAX_AGE =
  SECONDS_PER_MINUTE * MINUTES_PER_HOUR * HOURS_PER_DAY * SIDEBAR_COOKIE_DAYS;
export const SIDEBAR_WIDTH = '16rem';
export const SIDEBAR_WIDTH_MOBILE = '18rem';
export const SIDEBAR_WIDTH_ICON = '3rem';
export const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

export enum SidebarState {
  Collapsed = 'collapsed',
  Expanded = 'expanded',
}

export enum SidebarSlot {
  Content = 'sidebar-content',
  Footer = 'sidebar-footer',
  Group = 'sidebar-group',
  Header = 'sidebar-header',
  Input = 'sidebar-input',
  Menu = 'sidebar-menu',
  Separator = 'sidebar-separator',
}
