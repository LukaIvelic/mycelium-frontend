import { Handle, Position } from '@xyflow/react';
import { GitPullRequest } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

interface CustomNodeProps {
  data: {
    content: ReactNode;
  };
}

const SIDES: { id: string; position: Position }[] = [
  { id: 'l', position: Position.Left },
  { id: 'r', position: Position.Right },
  { id: 't', position: Position.Top },
  { id: 'b', position: Position.Bottom },
];

function CustomNode({ data }: CustomNodeProps) {
  return (
    <div className="w-80 rounded-xl border border-foreground/10 bg-[#252525] p-1 text-white shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
      {SIDES.map(({ id, position }) => (
        <Handle
          key={`s-${id}`}
          id={`s-${id}`}
          type="source"
          position={position}
          className="opacity-0! pointer-events-none!"
        />
      ))}
      {SIDES.map(({ id, position }) => (
        <Handle
          key={`t-${id}`}
          id={`t-${id}`}
          type="target"
          position={position}
          className="opacity-0! pointer-events-none!"
        />
      ))}
      {data.content}
    </div>
  );
}

interface NodeContentProps {
  service: {
    name: string;
    description?: string;
    meta?: string;
    repository?: string;
  };
}

export function NodeContent({ service }: NodeContentProps) {
  return (
    <div className="rounded-lg p-4">
      <p className="text-base font-medium">{service.name}</p>
      <Link
        href={service.repository ?? '/'}
        className="text-blue-400 text-xs flex gap-1 py-1 hover:text-blue-300 hover:underline"
        style={{ fontFamily: 'monospace' }}
      >
        <GitPullRequest size={12} />
        {service.repository ?? 'repository'}
      </Link>
      {service.description ? (
        <p className="mt-2 text-sm text-foreground/70">{service.description}</p>
      ) : null}
      {service.meta ? (
        <p className="mt-3 text-xs uppercase text-foreground/45">
          {service.meta}
        </p>
      ) : null}
    </div>
  );
}

export const nodeTypes = {
  custom: CustomNode,
};
