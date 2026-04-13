'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { Spinner } from '../ui/spinner';
import { ReactNode } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  imageSrc?: string | null;
  icon?: LucideIcon | null;
  centerContent?: boolean;
}

export function Button({
  children,
  imageSrc,
  icon: Icon,
  isLoading,
  centerContent = false,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`mycelium-btn ${className ?? ''}`}
      {...rest}
      disabled={isLoading}
    >
      {imageSrc && (
        <div className="mycelium-btn-icon-wrapper">
          <Image
            src={imageSrc}
            fill
            sizes="20px"
            alt="button icon"
            className="mycelium-btn-image"
          />
        </div>
      )}

      {Icon && (
        <div className="mycelium-btn-icon-wrapper">
          <Icon size={20} />
        </div>
      )}

      <div
        className={cn(
          `mycelium-btn-text-wrapper`,
          (!imageSrc && !Icon) || centerContent ? '' : '-translate-x-5',
          isLoading ? 'justify-center' : 'justify-start',
        )}
      >
        {isLoading && <Spinner />}
        {children}
      </div>
    </button>
  );
}
