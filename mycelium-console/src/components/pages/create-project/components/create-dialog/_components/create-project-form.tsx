import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface CreateProjectFormProps {
  projectName: string;
  description: string;
  onProjectNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

export function CreateProjectForm({
  projectName,
  description,
  onProjectNameChange,
  onDescriptionChange,
}: CreateProjectFormProps) {
  return (
    <div className={cn("w-full p-4 py-2 gap-3", "flex flex-col")}>
      <Input
        placeholder="Project name"
        value={projectName}
        onChange={(e) => onProjectNameChange(e.target.value)}
        className={cn(
          "rounded-sm border-foreground/10",
          "outline-none focus-visible:ring-0 placeholder:text-foreground/50",
        )}
      />
      <Textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        className={cn(
          "rounded-sm border-foreground/10 resize-none",
          "outline-none focus-visible:ring-0 placeholder:text-foreground/50",
        )}
        rows={3}
      />
    </div>
  );
}
