"use client";

import { ReactFlow, Background } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { use } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: Props) {
  const { id: projectId } = use(params);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ReactFlow
        fitView
        defaultNodes={[]}
        defaultEdges={[]}
        proOptions={{ hideAttribution: true }}
      >
        <Background />
      </ReactFlow>
    </div>
  );
}
