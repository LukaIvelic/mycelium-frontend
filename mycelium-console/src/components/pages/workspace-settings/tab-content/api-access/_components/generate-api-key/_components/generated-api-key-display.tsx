import { cn } from "@/lib/utils";

import { ApiKeyCopyField } from "./api-key-copy-field";
import { ApiKeyWarning } from "./api-key-warning";

export function GeneratedApiKeyDisplay({ apiKey }: { apiKey: string }) {
  return (
    <div className={cn("w-full p-4 py-2 gap-2")}>
      <div
        className={cn(
          "gap-2 px-2 pb-2",
          "flex flex-col",
          "border border-foreground/10 rounded-md",
        )}
      >
        <ApiKeyWarning />
        <ApiKeyCopyField apiKey={apiKey} />
      </div>
    </div>
  );
}
