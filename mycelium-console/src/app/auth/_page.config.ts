import { ProxyRoute } from '@/_proxy.utils';
import { AtSign, LucideIcon } from 'lucide-react';
import { signIn } from 'next-auth/react';

const BASE_PATH = '/console';

export type Alternative = {
  title: string;
  img: string | null;
  icon: LucideIcon | null;
  route?: ProxyRoute;
  onClick?: () => void;
};

export const alternatives: Alternative[] = [
  {
    title: 'Continue with Google',
    img: `${BASE_PATH}/images/google_logo.png`,
    icon: null,
    onClick: () => {
      signIn('google');
    }
  },
  {
    title: 'Continue with GitHub',
    img: `${BASE_PATH}/images/github_logo.png`,
    icon: null,
  },
  {
    title: 'Continue to Sign up',
    img: null,
    icon: AtSign,
    route: ProxyRoute.SIGNUP,
  },
];
