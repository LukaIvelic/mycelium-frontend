"use client";

import { useTabs } from "@/components/features/tabs";
import { Button } from "@/components/ui/button";
import { useSheet } from "@/hooks/use-sheet.hook";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { ReactNode } from "react";

export function Sheet() {
  const tabs_content: Map<string, ReactNode> = new Map([
    ["General Settings", <div>Details content</div>],
    ["Performance Metrics", <div>Logs content</div>],
    ["Communication", <div>Metrics content</div>],
    ["Payload Details", <div>Traces content</div>],
  ]);

  const { open, selectedNode, closeSheet } = useSheet();
  const { tabs, activeTab } = useTabs({
    items: tabs_content.keys().toArray(),
  });

  return (
    <div
      className={cn(
        "absolute top-4 right-4 z-100",
        "h-[calc(100%-32px)] w-[40vw] min-w-150 p-10",
        "border border-foreground/10 rounded-2xl bg-[#252525]",
        "transition-all duration-300 ease-in-out",
        "flex flex-col gap-8 overflow-y-auto",
        open ? "translate-x-0" : "translate-x-[110%]",
      )}
    >
      <div className="grid grid-cols-[1fr_auto] gap-4 w-full">
        <div>
          <div className="text-[20px] font-medium">
            {selectedNode?.label ?? "Service details"}
          </div>
          <div className="text-sm text-foreground/65 mt-2">
            {selectedNode?.serviceKey ??
              selectedNode?.origin ??
              "No service selected"}
          </div>
        </div>
        <Button
          className="w-fit p-1 aspect-square hover:cursor-pointer"
          variant="ghost"
          onClick={closeSheet}
        >
          <X />
        </Button>
      </div>

      <div className="bg-inherit">{tabs}</div>

      <div className="grid gap-6">{activeTab}</div>
    </div>
  );
}
