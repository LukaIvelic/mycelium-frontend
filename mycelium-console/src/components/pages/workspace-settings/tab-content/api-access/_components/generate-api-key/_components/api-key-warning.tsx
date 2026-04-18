import { TriangleAlert } from "lucide-react";

import { cn } from "@/lib/utils";

export function ApiKeyWarning() {
  return (
    <div
      className={cn("gap-2 p-2 pb-0", "flex items-center", "text-orange-300")}
    >
      <TriangleAlert size={18} strokeWidth={1.5} />
      <span className={cn("text-sm")}>
        Copy and save your API key. You won't be able to see it again.
      </span>
    </div>
  );
}
