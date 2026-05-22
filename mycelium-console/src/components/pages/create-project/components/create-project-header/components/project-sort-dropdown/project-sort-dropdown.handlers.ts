import type { Dispatch, SetStateAction } from 'react';
import type {
  ProjectSortDirectionOption,
  ProjectSortOption,
} from '../../../../create-project.types';

export function createProjectSortSelectHandler(
  setSelectedSortOption: Dispatch<SetStateAction<ProjectSortOption>>,
  sortOption: ProjectSortOption,
) {
  return function handleProjectSortSelect(): void {
    setSelectedSortOption(sortOption);
  };
}

export function createProjectSortDirectionSelectHandler(
  setSelectedSortDirectionOption: Dispatch<
    SetStateAction<ProjectSortDirectionOption>
  >,
  sortDirectionOption: ProjectSortDirectionOption,
) {
  return function handleProjectSortDirectionSelect(): void {
    setSelectedSortDirectionOption(sortDirectionOption);
  };
}
