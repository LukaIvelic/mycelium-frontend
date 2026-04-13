import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Log into Mycelium',
  description:
    'Log into Mycelium to get access to internal workflows, finances and more',
};

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#252525]">
      <main className="mx-auto w-fit h-full">{children}</main>
    </div>
  );
}
