"use client";

import { applyNodeChanges, Background, Controls, Edge, Node, NodeChange, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { use, useEffect, useState } from "react";
import MagicBeamEdge from "@/components/features/react-flow/magic-ui-beam-edge";
import {
  NodeContent,
  nodeTypes,
} from "@/components/features/react-flow/project-node";
import { Sheet } from "@/components/layout/sheet/sheet";
import { useReactFlowLayout } from "@/hooks/use-react-flow-layout.hook";
import { useSheet } from "@/hooks/use-sheet.hook";
import { useServices } from "@/hooks/use-services.hook";
import { Service } from "@/api/services/services/services-service.types";

interface Props {
  params: Promise<{ id: string }>;
}

const edgeTypes = {
  magic: MagicBeamEdge,
};

export default function Page({ params }: Props) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const { id: projectId } = use(params);
  const { findByProjectId } = useReactFlowLayout();
  const { findById } = useServices();
  const { openSheet } = useSheet();

  useEffect(() => {
    if (!projectId) return;

    const fetchLayout = async () => {
      const layout = await findByProjectId(projectId);
      const nodes = layout.nodes;
      const edges = layout.edges;

      const modifiedNodes = nodes.map(async (n)=> {
        const id = n.id.replace("service:", "");
        const service = await findById(id);

        console.log("Service for node", id, service);

        return {
          ...n,
          type: "custom",
          data: {
            ...n.data,
            content: (
              <NodeContent
                service={{
                  name: service.service_name,
                  description: service.service_description,
                  meta: service.service_version,
                }}
              />
            )
          }
        }
      });

      const modifiedEdges = edges.map((e) => ({
        ...e,
        type: "magic",
      }));
      
      setNodes(await Promise.all(modifiedNodes));
      setEdges(modifiedEdges);
    };

    fetchLayout();

  }, [projectId]);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ReactFlow
        fitView
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        edgeTypes={edgeTypes}
        onEdgesChange={() => {}}
        proOptions={{ hideAttribution: true }}
        maxZoom={1}
        minZoom={0.75}
        snapToGrid
        className="relative"
        onNodeClick={(_, node) => {
          openSheet({} as any);
        }}
        onNodesChange={(changes: NodeChange[]) => {
          setNodes((nds) => applyNodeChanges(changes, nds));
        }}
      >
        <Background />
        <Controls className="text-foreground bg-background scale-110" />
        <Sheet />
      </ReactFlow>
    </div>
  );
}
