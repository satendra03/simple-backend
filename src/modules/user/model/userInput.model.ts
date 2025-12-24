export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

export type UpdateUserInput = Partial<CreateUserInput>;
