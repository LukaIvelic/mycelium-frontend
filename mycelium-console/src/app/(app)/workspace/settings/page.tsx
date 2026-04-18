"use client";

import { Centered } from "@/components/features/centered";
import { useTabs } from "@/components/features/tabs";
import { cn } from "@/lib/utils";

export default function Page() {
  const { activeTab, tabs } = useTabs({
    items: [
      "API Access Management",
      "Region & Localization",
      "Alert Configuration",
      "Data Tracing Customization",
      "Integrations",
    ],
  });

  return (
    <Centered>
      <div
        className={cn(
          "grid grid-cols-4 grid-rows-[auto_auto] items-center gap-4",
        )}
      >
        <div className="col-span-2 pb-4">
          <h1 className="text-[32px] font-medium">Workspace Settings</h1>
          <p className="text-foreground/50">
            Manage your workspace preferences and settings
          </p>
        </div>
      </div>
      <div className="col-span-4 row-start-2 h-full">{tabs}</div>
    </Centered>
  );
}
