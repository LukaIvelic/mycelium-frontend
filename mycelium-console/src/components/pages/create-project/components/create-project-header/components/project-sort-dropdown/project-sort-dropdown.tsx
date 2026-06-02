'use client';

import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu/dropdown-menu';
import {
  PROJECT_SORT_DIRECTION_OPTIONS,
  PROJECT_SORT_OPTIONS,
} from '../../../../create-project.config';
import {
  createProjectSortDirectionSelectHandler,
  createProjectSortSelectHandler,
} from './project-sort-dropdown.handlers';
import type { ProjectSortDropdownProps } from './project-sort-dropdown.types';

export function ProjectSortDropdown({
  selectedSortDirectionOption,
  selectedSortOption,
  setSelectedSortDirectionOption,
  setSelectedSortOption,
}: ProjectSortDropdownProps) {
  return (
    <div className='flex items-center gap-1 text-sm'>
      <span>Sort by:</span>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className='flex items-center gap-1 rounded-md px-1.5 py-1 text-foreground outline-hidden hover:bg-white/5'>
          <span>{selectedSortOption.label}</span>
          <ChevronDown className='size-3 text-foreground/50' />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          {PROJECT_SORT_OPTIONS.map((sortOption) => {
            const handleSortSelect = createProjectSortSelectHandler(
              setSelectedSortOption,
              sortOption,
            );

            return (
              <DropdownMenuItem
                key={sortOption.label}
                onClick={handleSortSelect}
              >
                {sortOption.label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className='flex items-center gap-1 rounded-md px-1.5 py-1 text-foreground outline-hidden hover:bg-white/5'>
          <span>{selectedSortDirectionOption.label}</span>
          <ChevronDown className='size-3 text-foreground/50' />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          {PROJECT_SORT_DIRECTION_OPTIONS.map((sortDirectionOption) => {
            const handleSortDirectionSelect =
              createProjectSortDirectionSelectHandler(
                setSelectedSortDirectionOption,
                sortDirectionOption,
              );

            return (
              <DropdownMenuItem
                key={sortDirectionOption.label}
                onClick={handleSortDirectionSelect}
              >
                {sortDirectionOption.label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
