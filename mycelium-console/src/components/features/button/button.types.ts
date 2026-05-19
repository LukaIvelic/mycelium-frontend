import type { LucideIcon } from 'lucide-react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  centerContent?: boolean;
  children: ReactNode;
  icon?: LucideIcon | null;
  imageSrc?: string | null;
  isLoading?: boolean;
}
