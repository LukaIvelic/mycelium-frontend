import { ProxyRoute } from '@/_proxy.utils';
import { AtSign, LucideIcon } from 'lucide-react';


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
