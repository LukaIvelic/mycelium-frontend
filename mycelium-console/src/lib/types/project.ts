import { User } from "./user";

export type Project = {
  id: string;
  name: string;
  user: User;
  api_key: string;
};
