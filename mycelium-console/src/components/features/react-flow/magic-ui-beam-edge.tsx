import { useId, useMemo } from "react";
import { BaseEdge, getSmoothStepPath, EdgeProps } from "@xyflow/react";

function darkenHex(hex: string, factor = 0.4): string {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = Math.round(((n >> 16) & 0xff) * factor);
  const g = Math.round(((n >> 8) & 0xff) * factor);
  const b = Math.round((n & 0xff) * factor);
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

interface MagicBeamEdgeData {
  reverse?: boolean;
  duration?: number;
  delay?: number;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  borderRadius?: number;
}

export default function MagicBeamEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: Omit<EdgeProps, "data"> & { data?: MagicBeamEdgeData }) {
  const {
    reverse = false,
    duration = 2,
    delay = 0,
    pathColor = "gray",
    pathWidth = 2,
    pathOpacity = 0.2,
    gradientStartColor = "#ffaa40",
    borderRadius = 16,
  } = data ?? {};

  const trailColor = darkenHex(gradientStartColor);

  const id = useId();

  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius,
  });

  const beam = useMemo(() => {
    const dx = targetX - sourceX;
    const dy = targetY - sourceY;
    const length = Math.hypot(dx, dy) || 1;

    const from = reverse
      ? { x: targetX, y: targetY, ex: sourceX, ey: sourceY }
      : { x: sourceX, y: sourceY, ex: targetX, ey: targetY };

    const ux = (from.ex - from.x) / length;
    const uy = (from.ey - from.y) / length;
    const overshoot = length * 0.5;

    return {
      x1From: from.x - ux * length,
      y1From: from.y - uy * length,
      x2From: from.x - ux * overshoot,
      y2From: from.y - uy * overshoot,
      x1To: from.ex + ux * overshoot,
      y1To: from.ey + uy * overshoot,
      x2To: from.ex + ux * length,
      y2To: from.ey + uy * length,
    };
  }, [sourceX, sourceY, targetX, targetY, reverse]);

  const dur = `${duration}s`;
  const begin = `${delay}s`;

  return (
    <>
      <BaseEdge
        path={edgePath}
        style={{
          stroke: pathColor,
          strokeWidth: pathWidth,
          strokeOpacity: pathOpacity,
          strokeLinecap: "round",
        }}
      />
      <path
        d={edgePath}
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth={pathWidth}
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
          x1={beam.x1From}
          y1={beam.y1From}
          x2={beam.x2From}
          y2={beam.y2From}
        >
          <animate
            attributeName="x1"
            values={`${beam.x1From};${beam.x1To}`}
            dur={dur}
            begin={begin}
            repeatCount="indefinite"
          />
          <animate
            attributeName="y1"
            values={`${beam.y1From};${beam.y1To}`}
            dur={dur}
            begin={begin}
            repeatCount="indefinite"
          />
          <animate
            attributeName="x2"
            values={`${beam.x2From};${beam.x2To}`}
            dur={dur}
            begin={begin}
            repeatCount="indefinite"
          />
          <animate
            attributeName="y2"
            values={`${beam.y2From};${beam.y2To}`}
            dur={dur}
            begin={begin}
            repeatCount="indefinite"
          />
          <stop offset="0%" stopColor={trailColor} stopOpacity="0" />
          <stop offset="20%" stopColor={trailColor} stopOpacity="0.5" />
          <stop offset="67.5%" stopColor={gradientStartColor} />
          <stop offset="100%" stopColor={gradientStartColor} stopOpacity="0" />
        </linearGradient>
      </defs>
    </>
  );
}
