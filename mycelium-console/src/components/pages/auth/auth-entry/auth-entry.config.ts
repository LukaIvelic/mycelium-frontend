import { AtSign } from 'lucide-react';
import { ProxyRoute } from '@/_proxy.utils';
import type { AuthAlternative } from '../auth.types';

export const alternatives: AuthAlternative[] = [
  {
    title: 'Continue to Sign up',
    img: null,
    icon: AtSign,
    route: ProxyRoute.SIGNUP,
  },
];
