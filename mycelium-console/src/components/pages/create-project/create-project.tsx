import { Centered } from '@/components/features/centered';
import { CreateProjectHeader } from './components/create-project-header';
import { ProjectsView } from './components/projects-view';

export function CreateProjectPage() {
  return (
    <Centered>
      <div className='flex flex-col gap-8'>
        <CreateProjectHeader />
        <ProjectsView />
      </div>
    </Centered>
  );
}
