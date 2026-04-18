import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function ApiKeyNameInput({
  onChange,
}: {
  onChange: (value: string) => void;
}) {
  return (
    <Input
      placeholder="API key name"
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "rounded-sm border-foreground/10",
        "outline-none focus-visible:ring-0 placeholder:text-foreground/50",
      )}
    />
  );
}
