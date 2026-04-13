import { AtSign, LucideIcon } from 'lucide-react';

const BASE_PATH = '/console';

export type Alternative = {
  title: string;
  img: string | null;
  icon: LucideIcon | null;
};

export const alternatives: Alternative[] = [
  {
    title: 'Continue with Google',
    img: `${BASE_PATH}/images/google_logo.png`,
    icon: null,
  },
  {
    title: 'Continue with GitHub',
    img: `${BASE_PATH}/images/github_logo.png`,
    icon: null,
  },
  { title: 'Continue to Sign up', img: null, icon: AtSign },
];
