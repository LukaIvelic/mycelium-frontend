export type ApiKey = {
  id: string;
  name: string;
  projectId: string;
  keyPrefix: string;
  validFrom: string;
  validTo: string | null;
  revokedAt: string | null;
  createdAt: string;
};
