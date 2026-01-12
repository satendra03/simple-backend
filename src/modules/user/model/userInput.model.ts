export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  role?: "user" | "admin";
  refreshToken: string | null;
}

export type UpdateUserInput = Partial<CreateUserInput>;
