export type ReactFlowLayout = {
    nodes: ReactFlowNode[];
    edges: ReactFlowEdge[];
}

type ReactFlowNode = {
    id: string;
    data: {
        label: string;
    }
    position: {
        x: number;
        y: number;
    }
}

type ReactFlowEdge = {
    id: string;
    source: string;
    target: string;
}