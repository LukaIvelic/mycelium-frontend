import type { ApiKey } from './api-key';
import type { User } from './user';

export type Project = {
  id: string;
  name: string;
  description: string;
  user: User;
  api_key: ApiKey;
  created_at: string;
};
