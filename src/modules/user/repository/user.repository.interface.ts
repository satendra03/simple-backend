import { User } from "../model/user.model.js";
import { CreateUserInput, UpdateUserInput } from "../model/userInput.model.js";

export interface UserRepositoryInterface {
    getAll: () => Promise<User[]>;
    getById: (userId: string) => Promise<User | null>;
    create: (user: CreateUserInput) => Promise<User>;
    update: (userId: string, updates: UpdateUserInput) => Promise<User | null>;
    delete: (userId: string) => Promise<User | null>;
}