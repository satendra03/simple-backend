import { User } from "../model/user.model.js";
import { CreateUserInput, UpdateUserInput } from "../model/userInput.model.js";

export interface UserService {
    getAllUsers: () => Promise<User[]>;
    getUserById: (userId: string) => Promise<User>;
    getUserByEmail: (email: string) => Promise<User>;
    createUser: (user: CreateUserInput) => Promise<User>;
    updateUser: (userId: string, updates: UpdateUserInput) => Promise<User>;
    deleteUser: (userId: string) => Promise<User>;
}