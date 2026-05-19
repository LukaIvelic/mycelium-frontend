import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/features/providers';
import { satoshi } from '@/lib/config/satoshi';
import { cn } from '@/lib/utils';
import {
  ROOT_APP_DESCRIPTION,
  ROOT_APP_TITLE,
  ROOT_HTML_LANG,
} from './layout.config';
import type { RootLayoutProps } from './layout.types';

export const metadata: Metadata = {
  title: ROOT_APP_TITLE,
  description: ROOT_APP_DESCRIPTION,
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang={ROOT_HTML_LANG} className='h-full antialiased'>
      <body
        className={cn('min-h-full flex flex-col font-sans', satoshi.variable)}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
