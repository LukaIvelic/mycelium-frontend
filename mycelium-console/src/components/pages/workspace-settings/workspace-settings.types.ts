import type { Project } from '@/lib/types/project';

export interface WorkspaceProjectSettingsProps {
  isLoading: boolean;
  onProjectChange: (project: Project | null) => void;
  projects: Project[];
  selectedProject: Project | null;
}
