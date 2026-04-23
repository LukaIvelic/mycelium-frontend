import { Handle, Position } from "@xyflow/react";

function CustomNode({ data }: { data: { content: React.ReactNode } }) {
  return (
    <div className="w-80 rounded-xl border border-foreground/10 bg-[#252525] p-1 text-white shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
      <Handle type="target" position={Position.Left} />
      {data.content}
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export function NodeContent({
  service,
}: {
  service: { name: string; description?: string; meta?: string };
}) {
  return (
    <div className="rounded-lg p-4">
      <p className="text-base font-medium">{service.name}</p>
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
