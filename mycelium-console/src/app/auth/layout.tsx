import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Mycelium - Passive Trace & Microservice Dependency Mapping ',
  description: 'Untangle your project using Mycelium.',
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
