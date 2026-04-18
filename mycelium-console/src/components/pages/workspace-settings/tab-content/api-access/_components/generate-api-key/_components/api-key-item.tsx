"use client";

import dateFormat from "dateformat";
import { Eye, Trash } from "lucide-react";

import { Truncate } from "@/components/features/truncate";
import { useApiKeys } from "@/hooks/use-api-keys.hook";
import { useUsers } from "@/hooks/use-users.hook";
import { ApiKey } from "@/lib/types/api-key";
import { cn } from "@/lib/utils";

export function ApiKeyItem({ apiKey }: { apiKey: ApiKey }) {
  const { useMe } = useUsers();
  const { data: user } = useMe();

  const { useProjectByApiKeyId, useRevokeApiKey } = useApiKeys();
  const { data: project } = useProjectByApiKeyId(apiKey.id);
  const revokeApiKey = useRevokeApiKey();

  const fields = [
    { label: "Name", value: apiKey.name },
    { label: "Created at", value: dateFormat(apiKey.created_at) },
    {
      label: "For project",
      value: project ? <Truncate text={project.name} max={20} /> : "—",
    },
    { label: "Bound to", value: user?.email ?? "—" },
  ];

  const handleApiKeyRevoke = () => {
    revokeApiKey.mutate(apiKey.id);
  };

  return (
    <div
      className={cn(
        "h-14 p-2 pl-4",
        "grid grid-cols-[1fr_1fr_1fr_1fr_auto] grid-rows-2 items-center",
        "border border-foreground/10 rounded-md bg-background",
      )}
    >
      <div
        className={cn(
          "h-full gap-2",
          "flex items-center justify-center col-start-5 row-span-2",
          "transition-all",
        )}
      >
        <div className={cn("p-2", "border border-foreground/10 rounded-md group hover:cursor-pointer")}>
          <Eye
            className={cn(
              "text-foreground/50",
              "group-hover:text-foreground",
            )}
            size={20}
            strokeWidth={1.5}
          />
        </div>
        <div className={cn("p-2", "border border-foreground/10 rounded-md group hover:cursor-pointer")} 
            onClick={handleApiKeyRevoke}>
          <Trash
            className={cn(
              "text-foreground/50",
              "group-hover:text-red-400",
            )}
            size={20}
            strokeWidth={1.5}
          />
        </div>
      </div>

      {fields.map((field, index) => (
        <p
          key={`label-${index}`}
          style={{ gridColumn: index + 1, gridRow: 1 }}
          className={cn("text-foreground/50", "text-sm font-medium")}
        >
          {field.label}
        </p>
      ))}

      {fields.map((field, index) => (
        <p
          key={`value-${index}`}
          style={{ gridColumn: index + 1, gridRow: 2 }}
          className={cn("text-sm font-medium")}
        >
          {field.value}
        </p>
      ))}
    </div>
  );
}
