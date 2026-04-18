import { ApiKey } from "./api-key";
import { User } from "./user";

export type Project = {
  id: string;
  name: string;
  description: string;
  user: User;
  api_key: ApiKey;
  created_at: string;
};
