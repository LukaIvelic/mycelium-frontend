"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useUsers } from "@/hooks/use-users.hook";
import { cn } from "@/lib/utils";
import { LayoutGrid, Plus } from "lucide-react";

import { CreateProjectCommand } from "./create-dialog/create-project-command";

export function CreateProjectHeader() {
  const [createOpen, setCreateOpen] = useState(false);

  const { useMe, useUserProjectsCount } = useUsers();
  const { data: user } = useMe();
  const { data: projectCount = 0 } = useUserProjectsCount(user?.id ?? "");

  return (
    <div className={cn("grid grid-cols-4 grid-rows-2 items-center")}>
      <h1 className="col-1 text-[32px] font-medium">Projects</h1>

      <Button
        size={"lg"}
        className={cn(
          "col-4 w-fit",
          "justify-self-end",
          "hover:cursor-pointer",
        )}
        onClick={() => setCreateOpen(true)}
      >
        <Plus /> <span className="text-base font-normal">New</span>
      </Button>
      <CreateProjectCommand open={createOpen} onOpenChange={setCreateOpen} />

      <div className={cn("col-1 row-2", "flex gap-2")}>
        <div className="flex items-center gap-2 text-foreground/50">
          <LayoutGrid size={16} />
          <span className="text-sm">{projectCount} Projects</span>
        </div>
        <Separator orientation="vertical" className={"bg-foreground/20"} />
        <div className="flex items-center gap-2 text-foreground/50">
          <span>To Do</span>
        </div>
      </div>
    </div>
  );
}
