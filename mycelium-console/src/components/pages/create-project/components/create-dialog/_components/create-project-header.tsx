import { cn } from "@/lib/utils";

export function CreateProjectHeader() {
  return (
    <div className={cn("p-4 pb-1 gap-1", "flex flex-col")}>
      <h1 className={cn("text-[20px] font-medium")}>Create New Project</h1>
      <p className={cn("text-foreground/50", "text-sm")}>
        Give your project a name to get started.
      </p>
    </div>
  );
}
