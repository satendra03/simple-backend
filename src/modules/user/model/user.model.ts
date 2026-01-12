// user.model.ts
export interface UserDb {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  refreshToken: string | null;

  createdAt: Date;
  updatedAt: Date;
}

export interface User extends UserDb {
  id: string;
}