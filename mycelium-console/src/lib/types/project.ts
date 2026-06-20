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

export type ProjectMemberRole = 'owner' | 'admin' | 'member' | 'viewer';
export type AssignableProjectMemberRole = Exclude<ProjectMemberRole, 'owner'>;

export type ProjectMember = {
  createdAt: string;
  email: string;
  isOwner: boolean;
  projectId: string;
  role: ProjectMemberRole;
  updatedAt: string;
  userId: string;
};
