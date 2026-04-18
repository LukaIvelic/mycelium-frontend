import { cn } from "@/lib/utils";

export function CreateApiKeyHeader() {
  return (
    <div className={cn("p-4 pb-1 gap-1", "flex flex-col")}>
      <h1 className={cn("text-[20px] font-medium")}>Create New Key</h1>
      <p className={cn("text-foreground/50", "text-sm")}>
        After you create the API key, it will be displayed only once. Make sure
        to copy it and store it in a secure location.
      </p>
    </div>
  );
}
