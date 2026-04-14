import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { satoshi } from '@/lib/config/satoshi';
import { Providers } from '@/components/features/providers';

export const metadata: Metadata = {
  title: 'Mycelium',
  description: 'Passive Trace & Microservice Dependency Mapping',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className={cn('min-h-full flex flex-col font-sans', satoshi.variable)}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
