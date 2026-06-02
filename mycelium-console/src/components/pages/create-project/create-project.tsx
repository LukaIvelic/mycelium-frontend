'use client';

import { useState } from 'react';
import type { ProjectSortParams } from '@/api/services/project/project-service.types';
import { Centered } from '@/components/features/centered/centered';
import { CreateProjectHeader } from './components/create-project-header/create-project-header';
import { ProjectsView } from './components/projects-view/projects-view';
import {
  DEFAULT_PROJECT_SORT_DIRECTION_OPTION,
  DEFAULT_PROJECT_SORT_OPTION,
} from './create-project.config';
import type {
  ProjectSortDirectionOption,
  ProjectSortOption,
} from './create-project.types';

export function CreateProjectPage() {
  const [selectedSortOption, setSelectedSortOption] =
    useState<ProjectSortOption>(DEFAULT_PROJECT_SORT_OPTION);
  const [selectedSortDirectionOption, setSelectedSortDirectionOption] =
    useState<ProjectSortDirectionOption>(DEFAULT_PROJECT_SORT_DIRECTION_OPTION);
  const sortParams: ProjectSortParams = {
    field: selectedSortOption.field,
    sort: selectedSortDirectionOption.sort,
  };

  return (
    <Centered>
      <div className='flex flex-col gap-8'>
        <CreateProjectHeader
          selectedSortDirectionOption={selectedSortDirectionOption}
          selectedSortOption={selectedSortOption}
          setSelectedSortDirectionOption={setSelectedSortDirectionOption}
          setSelectedSortOption={setSelectedSortOption}
        />
        <ProjectsView sortParams={sortParams} />
      </div>
    </Centered>
  );
}
