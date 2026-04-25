import { AtSign, type LucideIcon } from 'lucide-react';
import { ProxyRoute } from '@/_proxy.utils';

export type Alternative = {
  title: string;
  img: string | null;
  icon: LucideIcon | null;
  route?: ProxyRoute;
  onClick?: () => void;
};

export const alternatives: Alternative[] = [
  {
    title: 'Continue to Sign up',
    img: null,
    icon: AtSign,
    route: ProxyRoute.SIGNUP,
  },
];
