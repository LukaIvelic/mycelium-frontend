import type { AuthLayoutProps } from './auth-layout.types';

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className='min-h-screen bg-[#252525]'>
      <main className='mx-auto w-fit h-full'>{children}</main>
    </div>
  );
}
