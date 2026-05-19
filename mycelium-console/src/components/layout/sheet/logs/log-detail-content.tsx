import { LogDetailBodyContent } from './log-detail-body-content';
import { LogDetailKeyValueRow } from './log-detail-key-value-row';
import { LogDetailSection } from './log-detail-section';
import { LogDetailLabel } from './logs.config';
import type { LogDetailContentProps } from './logs.types';

export function LogDetailContent({
  detail,
  isLoading,
  logId,
}: LogDetailContentProps) {
  const hasHeaders = Boolean(detail && Object.keys(detail.headers).length > 0);
  const hasBody = Boolean(detail?.body);

  if (isLoading) {
    return <LogDetailMessage message='Loading details...' />;
  }

  if (!hasHeaders && !hasBody) {
    return <LogDetailMessage message='No detail content available.' />;
  }

  return (
    <>
      {hasHeaders && <LogHeadersSection detail={detail} logId={logId} />}
      {detail?.body && <LogBodySection body={detail.body} logId={logId} />}
    </>
  );
}

function LogHeadersSection({
  detail,
  logId,
}: Pick<LogDetailContentProps, 'detail' | 'logId'>) {
  return (
    <LogDetailSection
      title={LogDetailLabel.Headers}
      contentId={`log-headers-${logId}`}
    >
      <div className='grid gap-1 p-2 text-xs font-mono'>
        {Object.entries(detail?.headers ?? {}).map(([key, value]) => (
          <LogDetailKeyValueRow key={key} label={key}>
            <span className='min-w-0 break-words text-emerald-300'>
              {value}
            </span>
          </LogDetailKeyValueRow>
        ))}
      </div>
    </LogDetailSection>
  );
}

function LogBodySection({ body, logId }: { body: string; logId: string }) {
  return (
    <LogDetailSection
      title={LogDetailLabel.Body}
      contentId={`log-body-${logId}`}
    >
      <LogDetailBodyContent body={body} />
    </LogDetailSection>
  );
}

function LogDetailMessage({ message }: { message: string }) {
  return <div className='p-2 text-xs text-foreground/50'>{message}</div>;
}
