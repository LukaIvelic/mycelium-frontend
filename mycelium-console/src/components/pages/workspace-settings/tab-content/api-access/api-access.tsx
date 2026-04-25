import { ApiUsage } from './_components/api-usage';
import { GenerateApiKey } from './_components/generate-api-key/generate-api-key';

export function ApiAccess() {
  return (
    <div className="w-full flex flex-col gap-12">
      <ApiUsage />
      <GenerateApiKey />
    </div>
  );
}
