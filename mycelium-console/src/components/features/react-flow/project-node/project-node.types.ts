import type { Position } from '@xyflow/react';
import type { ReactNode } from 'react';

export interface CustomNodeProps {
  data: {
    content: ReactNode;
  };
}

export interface NodeContentProps {
  service: NodeContentService;
}

export interface NodeContentService {
  name: string;
  description?: string;
  meta?: string;
  repository?: string;
}

export interface ProjectNodeHandleSide {
  id: ProjectNodeHandleId;
  position: Position;
}

export enum ProjectNodeHandleId {
  Bottom = 'b',
  Left = 'l',
  Right = 'r',
  Top = 't',
}

export enum ProjectNodeTypeName {
  Custom = 'custom',
}
