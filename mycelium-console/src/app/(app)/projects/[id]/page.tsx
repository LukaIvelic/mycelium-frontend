import { ProjectGraph } from '@/components/features/project-graph/project-graph';
import type { PageProps } from './page.types';

export default function Page({ params }: PageProps) {
  return <ProjectGraph params={params} />;
}
