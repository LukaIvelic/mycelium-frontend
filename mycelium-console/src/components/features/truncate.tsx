"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface TruncateProps {
  text: string;
  max: number;
  className?: string;
}

export function Truncate({ text, max, className }: TruncateProps) {
  if (text.length <= max) {
    return <span className={className}>{text}</span>;
  }

  const truncated = text.slice(0, max) + "…";

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          render={<span className={cn(className)}>{truncated}</span>}
        />
        <TooltipContent>{text}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
