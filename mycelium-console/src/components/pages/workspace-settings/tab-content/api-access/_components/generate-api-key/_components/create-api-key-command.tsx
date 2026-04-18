"use client";

import { useState } from "react";

import { Command, CommandDialog } from "@/components/ui/command";
import { useProjects } from "@/hooks/use-projects.hook";
import { useUsers } from "@/hooks/use-users.hook";
import { Project } from "@/lib/types/project";
import { cn } from "@/lib/utils";

import { CreateApiKeyFooter } from "./create-api-key-footer";
import { CreateApiKeyForm } from "./create-api-key-form";
import { CreateApiKeyHeader } from "./create-api-key-header";
import { GeneratedApiKeyDisplay } from "./generated-api-key-display";

interface CreateApiKeyCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateApiKeyCommand({
  open,
  onOpenChange,
}: CreateApiKeyCommandProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [apiKeyName, setApiKeyName] = useState<string | null>(null);
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);

  const { useMe } = useUsers();
  const { data: user } = useMe();

  const { useProjectsByUserId, useAddApiKey } = useProjects();
  const { data: projects = [] } = useProjectsByUserId(user?.id, false);
  const addApiKey = useAddApiKey(selectedProject?.id ?? "");

  const canGenerate =
    Boolean(selectedProject?.id) && !addApiKey.isPending && !generatedKey;

  const handleGenerateApiKey = async () => {
    if (!canGenerate) return;
    const response = await addApiKey.mutateAsync({
      name: apiKeyName ?? undefined,
    });
    setGeneratedKey(response.key);
  };

  const handleOpenChange = (
    next: boolean,
    eventDetails?: { reason?: string; cancel?: () => void },
  ) => {
    if (!next && eventDetails?.reason === "escape-key") {
      eventDetails.cancel?.();
      return;
    }

    if (!next) {
      setSelectedProject(null);
      setApiKeyName(null);
      setGeneratedKey(null);
    }
    onOpenChange(next);
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={handleOpenChange}
      disablePointerDismissal
      title="Create API Key"
      description="Pick a project to scope the new API key to."
      className={cn("sm:max-w-2xl h-fit", "left-[calc(50%+8rem)]")}
    >
      <Command>
        <CreateApiKeyHeader />
        <CreateApiKeyForm
          projects={projects}
          selectedProject={selectedProject}
          onSelectProject={setSelectedProject}
          onApiKeyNameChange={setApiKeyName}
          handleGenerateApiKey={handleGenerateApiKey}
          canGenerate={canGenerate}
        />
        {generatedKey && <GeneratedApiKeyDisplay apiKey={generatedKey} />}
        <CreateApiKeyFooter onClose={() => handleOpenChange(false)} />
      </Command>
    </CommandDialog>
  );
}
