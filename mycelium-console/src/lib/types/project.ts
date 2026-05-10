export type Project = {
  id: string;
  name: string;
  description: string | null;
  userId: string;
  validFrom: string;
  validTo: string | null;
  createdAt: string;
  updatedAt: string | null;
};
