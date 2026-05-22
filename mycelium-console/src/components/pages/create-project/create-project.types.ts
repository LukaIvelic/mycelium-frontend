import type { Dispatch, SetStateAction } from 'react';
import type {
  ProjectSortDirection,
  ProjectSortField,
} from '@/api/services/project/project-service.types';

export interface ProjectSortOption {
  field: ProjectSortField;
  label: string;
}

export interface ProjectSortDirectionOption {
  label: string;
  sort: ProjectSortDirection;
}

export interface ProjectSortProps {
  selectedSortDirectionOption: ProjectSortDirectionOption;
  selectedSortOption: ProjectSortOption;
  setSelectedSortDirectionOption: Dispatch<
    SetStateAction<ProjectSortDirectionOption>
  >;
  setSelectedSortOption: Dispatch<SetStateAction<ProjectSortOption>>;
}
