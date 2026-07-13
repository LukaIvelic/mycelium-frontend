import { BaseEdge, useInternalNode } from '@xyflow/react';
import dateFormat from 'dateformat';
import { useId, useMemo, useState } from 'react';
import { HoverCard } from '@/components/ui/hover-card/hover-card';
import { HoverCardContent } from '@/components/ui/hover-card/hover-card-content';
import { HoverCardTrigger } from '@/components/ui/hover-card/hover-card-trigger';
import { useSheetActions } from '@/hooks/use-sheet.hook';
import { statusCodeColor } from '@/lib/status-code';
import { cn } from '@/lib/utils';
import { MagicBeamGradient } from './magic-beam-gradient/magic-beam-gradient';
import {
  DEFAULT_MAGIC_BEAM_BORDER_RADIUS,
  DEFAULT_MAGIC_BEAM_DELAY_SECONDS,
  DEFAULT_MAGIC_BEAM_DURATION_SECONDS,
  DEFAULT_MAGIC_BEAM_GRADIENT_COLOR,
  DEFAULT_MAGIC_BEAM_PATH_COLOR,
  DEFAULT_MAGIC_BEAM_PATH_OPACITY,
  DEFAULT_MAGIC_BEAM_PATH_WIDTH,
  DEFAULT_MAGIC_BEAM_REVERSE,
  MAGIC_BEAM_EDGE_HOVER_PATH_WIDTH,
  MAGIC_BEAM_EDGE_TIMESTAMP_FORMAT,
} from './magic-ui-beam-edge.config';
import {
  calcBeamCoords,
  getEdgeEndpoints,
} from './magic-ui-beam-edge.geometry';
import { createMagicBeamEdgePathLayout } from './magic-ui-beam-edge.path';
import type {
  BeamCoords,
  EdgeEndpoints,
  MagicBeamEdgeData,
  MagicBeamEdgePathLayout,
  MagicBeamEdgeProps,
} from './magic-ui-beam-edge.types';

const MAGIC_BEAM_INTEGRATION_PREFIX = 'integration:';

interface CursorAnchorPoint {
  x: number;
  y: number;
}

export default function MagicBeamEdge({
  source,
  target,
  data,
}: MagicBeamEdgeProps) {
  const {
    reverse = DEFAULT_MAGIC_BEAM_REVERSE,
    duration = DEFAULT_MAGIC_BEAM_DURATION_SECONDS,
    delay = DEFAULT_MAGIC_BEAM_DELAY_SECONDS,
    pathColor = DEFAULT_MAGIC_BEAM_PATH_COLOR,
    pathWidth = DEFAULT_MAGIC_BEAM_PATH_WIDTH,
    pathOpacity = DEFAULT_MAGIC_BEAM_PATH_OPACITY,
    gradientStartColor = DEFAULT_MAGIC_BEAM_GRADIENT_COLOR,
    borderRadius = DEFAULT_MAGIC_BEAM_BORDER_RADIUS,
  } = data ?? {};
  const id = useId();
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);
  const endpoints = useMemo<EdgeEndpoints | null>(() => {
    if (!sourceNode || !targetNode) {
      return null;
    }

    return getEdgeEndpoints(sourceNode, targetNode);
  }, [sourceNode, targetNode]);
  const edgePathLayout = useMemo<MagicBeamEdgePathLayout | null>(() => {
    if (!endpoints) {
      return null;
    }

    return createMagicBeamEdgePathLayout(endpoints, borderRadius);
  }, [endpoints, borderRadius]);
  const beam = useMemo<BeamCoords | null>(() => {
    if (!endpoints) {
      return null;
    }

    return calcBeamCoords(endpoints, reverse);
  }, [endpoints, reverse]);

  if (!edgePathLayout || !beam || !endpoints) {
    return null;
  }

  const { path: edgePath } = edgePathLayout;
  const durationValue = `${duration}s`;
  const beginValue = `${delay}s`;

  return (
    <>
      <BaseEdge
        path={edgePath}
        style={{
          stroke: pathColor,
          strokeWidth: pathWidth,
          strokeOpacity: pathOpacity,
          strokeLinecap: 'round',
        }}
      />
      <path
        d={edgePath}
        fill='none'
        stroke={`url(#${id})`}
        strokeWidth={pathWidth}
        strokeLinecap='round'
      />
      <defs>
        <MagicBeamGradient
          id={id}
          beam={beam}
          durationValue={durationValue}
          beginValue={beginValue}
          gradientStartColor={gradientStartColor}
        />
      </defs>
      <MagicBeamEdgeHoverCard
        data={data}
        layout={edgePathLayout}
        sourceNodeId={source}
        targetNodeId={target}
      />
    </>
  );
}

interface MagicBeamEdgeHoverCardProps {
  data?: MagicBeamEdgeData;
  layout: MagicBeamEdgePathLayout;
  sourceNodeId: string;
  targetNodeId: string;
}

function MagicBeamEdgeHoverCard({
  data,
  layout,
  sourceNodeId,
  targetNodeId,
}: MagicBeamEdgeHoverCardProps) {
  const { openSheet } = useSheetActions();
  const [cursorAnchorPoint, setCursorAnchorPoint] =
    useState<CursorAnchorPoint | null>(null);
  const communications = data?.communications ?? [];
  const requests = data?.requests ?? [];
  const cursorAnchor = useMemo(
    () => createCursorAnchor(cursorAnchorPoint),
    [cursorAnchorPoint],
  );

  if (communications.length === 0 && requests.length === 0) {
    return null;
  }

  const sourceLabel = data?.sourceLabel ?? 'Source';
  const targetLabel = data?.targetLabel ?? 'Target';
  const communicationCount =
    data?.communicationCount ??
    communications.reduce((total, { count }) => total + count, 0);
  const sheetServiceId = getSheetServiceNodeId(sourceNodeId, targetNodeId);

  return (
    <HoverCard>
      <HoverCardTrigger
        closeDelay={150}
        delay={100}
        onPointerEnter={(event) => {
          setCursorAnchorPoint({ x: event.clientX, y: event.clientY });
        }}
        onPointerMove={(event) => {
          setCursorAnchorPoint({ x: event.clientX, y: event.clientY });
        }}
        render={
          <path
            aria-label={`View communication between ${sourceLabel} and ${targetLabel}`}
            d={layout.path}
            fill='none'
            pointerEvents='stroke'
            stroke='transparent'
            strokeLinecap='round'
            strokeWidth={MAGIC_BEAM_EDGE_HOVER_PATH_WIDTH}
            tabIndex={0}
          />
        }
        className='nodrag nopan cursor-help outline-hidden'
      />
      <MagicBeamEdgeHoverContent
        communicationCount={communicationCount}
        cursorAnchor={cursorAnchor}
        communications={communications}
        onOpenRequest={openSheet}
        requests={requests}
        sheetServiceId={sheetServiceId}
        sourceLabel={sourceLabel}
        targetLabel={targetLabel}
      />
    </HoverCard>
  );
}

interface MagicBeamEdgeHoverContentProps {
  communicationCount: number;
  cursorAnchor: ReturnType<typeof createCursorAnchor>;
  communications: NonNullable<MagicBeamEdgeData['communications']>;
  onOpenRequest: (data: unknown) => void;
  requests: NonNullable<MagicBeamEdgeData['requests']>;
  sheetServiceId: string;
  sourceLabel: string;
  targetLabel: string;
}

function MagicBeamEdgeHoverContent({
  communicationCount,
  cursorAnchor,
  communications,
  onOpenRequest,
  requests,
  sheetServiceId,
  sourceLabel,
  targetLabel,
}: MagicBeamEdgeHoverContentProps) {
  return (
    <HoverCardContent
      anchor={cursorAnchor}
      className='w-[26rem] max-w-[calc(100vw-2rem)] p-0'
      collisionAvoidance={{
        align: 'shift',
        fallbackAxisSide: 'none',
        side: 'flip',
      }}
      side='right'
      sideOffset={12}
    >
      <div className='border-foreground/10 border-b px-3 py-2.5'>
        <div className='text-foreground/45 text-xs uppercase'>
          Communication
        </div>
        <div className='mt-1 flex min-w-0 items-center gap-1.5 text-sm font-medium'>
          <span className='min-w-0 truncate'>{sourceLabel}</span>
          <span className='text-foreground/35'>-&gt;</span>
          <span className='min-w-0 truncate'>{targetLabel}</span>
        </div>
        <div className='text-foreground/50 mt-1 text-xs'>
          {communicationCount} requests across {communications.length} paths
        </div>
      </div>
      <div className='border-foreground/10 border-b'>
        <div className='px-3 pt-2 text-[11px] text-foreground/45 uppercase'>
          Paths
        </div>
        <div className='no-scrollbar flex max-h-48 flex-col gap-2 overflow-y-auto p-2'>
          {communications.map((communication) => (
            <div
              key={communication.id}
              className='rounded-md border border-foreground/10 bg-[#1d1d1d] p-2'
            >
              <div className='flex min-w-0 items-center gap-2'>
                <span className='shrink-0 rounded-sm bg-foreground/10 px-1.5 py-0.5 font-medium text-[11px] text-foreground/80'>
                  {communication.method}
                </span>
                <span className='min-w-0 flex-1 truncate text-fuchsia-300 text-xs'>
                  {communication.path}
                </span>
                <span
                  className={cn(
                    'shrink-0 text-xs font-medium',
                    statusCodeColor(communication.statusCode),
                  )}
                >
                  {communication.statusCode}
                </span>
              </div>
              <div className='mt-2 grid grid-cols-3 gap-2 text-[11px] text-foreground/55'>
                <span>{communication.count}x</span>
                <span>avg {communication.averageDurationMs}ms</span>
                <span>last {communication.lastDurationMs}ms</span>
              </div>
              <div className='mt-1 text-[11px] text-foreground/40'>
                {communication.protocol.toUpperCase()} -{' '}
                {dateFormat(
                  communication.lastSeenAt,
                  MAGIC_BEAM_EDGE_TIMESTAMP_FORMAT,
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className='flex items-center justify-between px-3 pt-2 text-[11px] text-foreground/45 uppercase'>
          <span>Requests</span>
          <span>Latest {requests.length}</span>
        </div>
        <div className='no-scrollbar flex h-72 flex-col gap-1.5 overflow-y-auto p-2'>
          {requests.length === 0 && (
            <div className='grid h-full place-items-center rounded-md border border-foreground/10 bg-[#1d1d1d] text-xs text-foreground/45'>
              No request summaries yet
            </div>
          )}
          {requests.map((request) => (
            <button
              key={request.id}
              type='button'
              onClick={(event) => {
                event.stopPropagation();
                onOpenRequest({
                  focusedLogId: request.id,
                  serviceId: sheetServiceId,
                });
              }}
              className='w-full rounded-md border border-foreground/10 bg-[#1d1d1d] p-2 text-left transition-colors hover:border-emerald-300/45 hover:bg-emerald-300/5 focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:outline-hidden'
            >
              <div className='flex min-w-0 items-center gap-2'>
                <span className='shrink-0 rounded-sm bg-foreground/10 px-1.5 py-0.5 font-medium text-[11px] text-foreground/80'>
                  {request.method}
                </span>
                <span className='min-w-0 flex-1 truncate text-fuchsia-300 text-xs'>
                  {request.path}
                </span>
                <span
                  className={cn(
                    'shrink-0 text-xs font-medium',
                    statusCodeColor(request.statusCode),
                  )}
                >
                  {request.statusCode}
                </span>
              </div>
              <div className='mt-1 grid grid-cols-[1fr_auto_auto] gap-2 text-[11px] text-foreground/50'>
                <span className='w-fit max-w-full min-w-0 truncate rounded-sm border border-foreground/10 bg-foreground/3 px-1.5 py-0.5 leading-none text-foreground/55'>
                  trace {request.traceId}
                </span>
                <span>{request.durationMs}ms</span>
                <span>
                  {dateFormat(
                    request.timestamp,
                    MAGIC_BEAM_EDGE_TIMESTAMP_FORMAT,
                  )}
                </span>
              </div>
              <div className='mt-1 flex min-w-0 flex-wrap items-center gap-1 text-[11px]'>
                <span className='rounded-sm border border-foreground/10 bg-foreground/3 px-1.5 py-0.5 leading-none text-foreground/55'>
                  {request.hasBody ? 'body' : 'no body'}
                </span>
                <span className='rounded-sm border border-foreground/10 bg-foreground/3 px-1.5 py-0.5 leading-none text-foreground/55'>
                  {formatBodySize(request.bodySizeKb)}
                </span>
                <span className='min-w-0 truncate rounded-sm border border-foreground/10 bg-foreground/3 px-1.5 py-0.5 leading-none text-foreground/55'>
                  headers {formatHeaderSize(request.headerSizeBytes)}
                </span>
              </div>
              <div className='mt-1 text-[11px] text-foreground/35'>
                {request.protocol.toUpperCase()} - span {request.spanId}
              </div>
            </button>
          ))}
        </div>
      </div>
    </HoverCardContent>
  );
}

function getSheetServiceNodeId(sourceNodeId: string, targetNodeId: string) {
  if (sourceNodeId.startsWith(MAGIC_BEAM_INTEGRATION_PREFIX)) {
    return sourceNodeId;
  }

  return targetNodeId;
}

function createCursorAnchor(point: CursorAnchorPoint | null) {
  if (!point) {
    return undefined;
  }

  return {
    getBoundingClientRect: () => {
      return new DOMRect(point.x, point.y, 0, 0);
    },
  };
}

function formatBodySize(bodySizeKb: number): string {
  if (bodySizeKb <= 0) {
    return '0 KB';
  }

  return `${bodySizeKb.toFixed(1)} KB`;
}

function formatHeaderSize(headerSizeBytes: number): string {
  if (headerSizeBytes < 1024) {
    return `${headerSizeBytes} B`;
  }

  return `${(headerSizeBytes / 1024).toFixed(1)} KB`;
}
