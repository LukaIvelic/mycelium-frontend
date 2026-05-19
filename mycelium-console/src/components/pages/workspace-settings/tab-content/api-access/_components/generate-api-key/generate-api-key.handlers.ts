import { API_KEY_COPY_RESET_DELAY_MS } from './generate-api-key.config';
import type {
  ApiKeyNameChangeEvent,
  CreateApiKeyEventDetails,
  CreateApiKeyGenerateHandlerParams,
  CreateApiKeyOpenChangeHandlerParams,
} from './generate-api-key.types';

export function createOpenApiKeyDialogHandler(
  setCreateOpen: (open: boolean) => void,
) {
  return function handleOpenApiKeyDialog(): void {
    setCreateOpen(true);
  };
}

export function createApiKeyCopiedResetHandler(
  setCopied: (copied: boolean) => void,
) {
  return function handleCopiedReset(): void {
    setCopied(false);
  };
}

export function createApiKeyCopyHandler(
  apiKey: string,
  setCopied: (copied: boolean) => void,
) {
  return async function handleCopy(): Promise<void> {
    const resetCopied = createApiKeyCopiedResetHandler(setCopied);

    await navigator.clipboard.writeText(apiKey);
    setCopied(true);
    window.setTimeout(resetCopied, API_KEY_COPY_RESET_DELAY_MS);
  };
}

export function createApiKeyRevokeHandler(
  apiKeyId: string,
  revokeApiKey: { mutate: (apiKeyId: string) => void },
) {
  return function handleApiKeyRevoke(): void {
    revokeApiKey.mutate(apiKeyId);
  };
}

export function createApiKeyNameChangeHandler(
  onChange: (value: string) => void,
) {
  return function handleApiKeyNameChange(event: ApiKeyNameChangeEvent): void {
    onChange(event.target.value);
  };
}

export function createApiKeyGenerateHandler({
  addApiKey,
  apiKeyName,
  canGenerate,
  setGeneratedKey,
}: CreateApiKeyGenerateHandlerParams) {
  return async function handleGenerateApiKey(): Promise<void> {
    if (!canGenerate) {
      return;
    }

    const name = apiKeyName ?? undefined;
    const response = await addApiKey.mutateAsync({ name });
    setGeneratedKey(response.key);
  };
}

export function createApiKeyResetHandler(
  setSelectedProject: (project: null) => void,
  setApiKeyName: (name: null) => void,
  setGeneratedKey: (key: null) => void,
) {
  return function reset(): void {
    setSelectedProject(null);
    setApiKeyName(null);
    setGeneratedKey(null);
  };
}

export function createApiKeyOpenChangeHandler({
  onOpenChange,
  reset,
}: CreateApiKeyOpenChangeHandlerParams) {
  return function handleOpenChange(
    nextOpen: boolean,
    eventDetails?: CreateApiKeyEventDetails,
  ): void {
    if (!nextOpen && eventDetails?.reason === 'escape-key') {
      eventDetails.cancel?.();
      return;
    }

    if (!nextOpen) {
      reset();
    }

    onOpenChange(nextOpen);
  };
}

export function createApiKeyCloseHandler(
  handleOpenChange: (nextOpen: boolean) => void,
) {
  return function handleClose(): void {
    handleOpenChange(false);
  };
}
