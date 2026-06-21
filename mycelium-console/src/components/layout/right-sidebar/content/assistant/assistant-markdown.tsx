import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { cn } from '@/lib/utils';

interface AssistantMarkdownProps {
  children: string;
  failed?: boolean;
}

export function AssistantMarkdown({
  children,
  failed = false,
}: AssistantMarkdownProps) {
  return (
    <ReactMarkdown
      components={{
        a: ({ children: linkChildren, href }) => (
          <a
            className={cn(
              'text-sky-300 underline underline-offset-2 hover:text-sky-200',
              failed && 'text-red-200 hover:text-red-100',
            )}
            href={href}
            rel='noreferrer'
            target='_blank'
          >
            {linkChildren}
          </a>
        ),
        blockquote: ({ children: quoteChildren }) => (
          <blockquote className='my-2 border-[#434343] border-l-2 pl-3 text-foreground/55'>
            {quoteChildren}
          </blockquote>
        ),
        code: ({ children: codeChildren, className }) => (
          <code
            className={cn(
              className,
              'rounded-sm bg-black/25 px-1 py-0.5 font-mono text-[0.84rem]',
            )}
          >
            {codeChildren}
          </code>
        ),
        h1: ({ children: headingChildren }) => (
          <h1 className='mt-1 mb-2 font-medium text-base'>{headingChildren}</h1>
        ),
        h2: ({ children: headingChildren }) => (
          <h2 className='mt-1 mb-2 font-medium text-base'>{headingChildren}</h2>
        ),
        h3: ({ children: headingChildren }) => (
          <h3 className='mt-1 mb-1.5 font-medium text-sm'>{headingChildren}</h3>
        ),
        hr: () => <hr className='my-2 border-[#434343]' />,
        li: ({ children: itemChildren }) => (
          <li className='pl-0.5'>{itemChildren}</li>
        ),
        ol: ({ children: listChildren }) => (
          <ol className='my-2 ml-4 list-decimal space-y-1'>{listChildren}</ol>
        ),
        p: ({ children: paragraphChildren }) => (
          <p className='mb-2 last:mb-0'>{paragraphChildren}</p>
        ),
        strong: ({ children: strongChildren }) => (
          <strong className='font-semibold'>{strongChildren}</strong>
        ),
        pre: ({ children: preChildren }) => (
          <pre className='my-2 max-w-full overflow-x-auto rounded-sm border border-[#434343] bg-black/25 p-2'>
            {preChildren}
          </pre>
        ),
        table: ({ children: tableChildren }) => (
          <div className='my-2 max-w-full overflow-x-auto'>
            <table className='w-full border-collapse text-left'>
              {tableChildren}
            </table>
          </div>
        ),
        td: ({ children: cellChildren }) => (
          <td className='border border-[#434343] px-2 py-1 align-top'>
            {cellChildren}
          </td>
        ),
        th: ({ children: cellChildren }) => (
          <th className='border border-[#434343] px-2 py-1 font-medium'>
            {cellChildren}
          </th>
        ),
        ul: ({ children: listChildren }) => (
          <ul className='my-2 ml-4 list-disc space-y-1'>{listChildren}</ul>
        ),
      }}
      remarkPlugins={[remarkGfm]}
    >
      {children}
    </ReactMarkdown>
  );
}
