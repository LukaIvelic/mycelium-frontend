export type UserProfile = {
  userId: string;
  firstName: string;
  lastName: string;
  initials: string;
  username: string;
  email: string;
  randomProfileHex: string;
  fullName: string;
  bio: string | null;
  jobTitle: string | null;
  company: string | null;
  location: string | null;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
};
