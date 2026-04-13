import { AtSign, LucideIcon } from 'lucide-react';

export type Alternative = {
  title: string;
  img: string | null;
  icon: LucideIcon | null;
};

export const alternatives: Alternative[] = [
  { title: 'Continue with Google', img: '/images/google_logo.png', icon: null },
  { title: 'Continue with GitHub', img: '/images/github_logo.png', icon: null },
  { title: 'Continue to Sign up', img: null, icon: AtSign },
];
