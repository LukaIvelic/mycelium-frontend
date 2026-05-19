import { Position } from '@xyflow/react';
import {
  ProjectNodeHandleId,
  type ProjectNodeHandleSide,
} from './project-node.types';

export const PROJECT_NODE_HANDLE_SIDES: ProjectNodeHandleSide[] = [
  { id: ProjectNodeHandleId.Left, position: Position.Left },
  { id: ProjectNodeHandleId.Right, position: Position.Right },
  { id: ProjectNodeHandleId.Top, position: Position.Top },
  { id: ProjectNodeHandleId.Bottom, position: Position.Bottom },
];

export const PROJECT_NODE_ICON_SIZE = 12;
export const PROJECT_NODE_REPOSITORY_MAX_LENGTH = 30;
