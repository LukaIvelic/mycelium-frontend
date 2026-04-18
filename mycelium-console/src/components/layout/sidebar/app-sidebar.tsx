import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { AppSidebarFooter } from '@/components/layout/sidebar/footer/app-sidebar-footer';

export function AppSidebar() {
  return (
    <Sidebar className="border-none">
      <SidebarHeader />
      <SidebarContent />
      <AppSidebarFooter />
    </Sidebar>
  );
}
