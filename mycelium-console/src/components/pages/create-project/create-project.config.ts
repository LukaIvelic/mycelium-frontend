import {
  ProjectSortDirection,
  ProjectSortField,
} from '@/api/services/project/project-service.types';
import type {
  ProjectSortDirectionOption,
  ProjectSortOption,
} from './create-project.types';

export const DEFAULT_PROJECT_SORT_OPTION: ProjectSortOption = {
  label: 'Recent Activity',
  field: ProjectSortField.RecentActivity,
};

export const DEFAULT_PROJECT_SORT_DIRECTION_OPTION: ProjectSortDirectionOption =
  {
    label: ProjectSortDirection.Desc,
    sort: ProjectSortDirection.Desc,
  };

export const PROJECT_SORT_DIRECTION_OPTIONS: ProjectSortDirectionOption[] = [
  {
    label: ProjectSortDirection.Asc,
    sort: ProjectSortDirection.Asc,
  },
  DEFAULT_PROJECT_SORT_DIRECTION_OPTION,
];

export const PROJECT_SORT_OPTIONS: ProjectSortOption[] = [
  {
    label: 'Alphabetical',
    field: ProjectSortField.Name,
  },
  {
    label: 'Registration Date',
    field: ProjectSortField.RegistrationDate,
  },
  DEFAULT_PROJECT_SORT_OPTION,
];
