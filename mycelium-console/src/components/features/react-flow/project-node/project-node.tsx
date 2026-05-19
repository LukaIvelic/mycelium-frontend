import { Handle } from '@xyflow/react';
import { GitPullRequest } from 'lucide-react';
import Link from 'next/link';
import { Truncate } from '@/components/features/truncate';
import {
  PROJECT_NODE_HANDLE_SIDES,
  PROJECT_NODE_ICON_SIZE,
  PROJECT_NODE_REPOSITORY_MAX_LENGTH,
} from './project-node.config';
import type { CustomNodeProps, NodeContentProps } from './project-node.types';

export function CustomNode({ data }: CustomNodeProps) {
  return (
    <div className='w-80 rounded-xl border border-foreground/10 bg-[#252525] p-1 text-white shadow-[0_18px_60px_rgba(0,0,0,0.35)] hover:cursor-pointer'>
      {PROJECT_NODE_HANDLE_SIDES.map(({ id, position }) => (
        <Handle
          key={`s-${id}`}
          id={`s-${id}`}
          type='source'
          position={position}
          className='opacity-0! pointer-events-none!'
        />
      ))}
      {PROJECT_NODE_HANDLE_SIDES.map(({ id, position }) => (
        <Handle
          key={`t-${id}`}
          id={`t-${id}`}
          type='target'
          position={position}
          className='opacity-0! pointer-events-none!'
        />
      ))}
      {data.content}
    </div>
  );
}

export function NodeContent({ service }: NodeContentProps) {
  const repositoryHref = service.repository ?? '/';
  const repositoryLabel = service.repository ?? 'repository';

  return (
    <div className='rounded-lg p-4'>
      <p className='text-base font-medium'>{service.name}</p>

      <Link
        href={repositoryHref}
        className='text-blue-400 text-xs flex gap-1 py-1 hover:text-blue-300 hover:underline w-fit'
        style={{ fontFamily: 'monospace' }}
      >
        <GitPullRequest size={PROJECT_NODE_ICON_SIZE} />
        <Truncate
          text={repositoryLabel}
          max={PROJECT_NODE_REPOSITORY_MAX_LENGTH}
        />
      </Link>

      {service.description && (
        <p className='mt-2 text-sm text-foreground/70'>{service.description}</p>
      )}

      {service.meta && (
        <p className='mt-3 text-xs uppercase text-foreground/45'>
          {service.meta}
        </p>
      )}
    </div>
  );
}
