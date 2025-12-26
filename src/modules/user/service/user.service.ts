import { UserService } from "./user.service.interface.js";
import { User } from "../model/user.model.js";
import { CreateUserInput, UpdateUserInput } from "../model/userInput.model.js";
import { FireStoreUserRepository } from "../repository/user.repository.js";
import { NotFoundError } from "@/shared/ApiError.js";

export class FireStoreUserService implements UserService {
    constructor(private repository: FireStoreUserRepository) {}
    
    getAllUsers = async (): Promise<User[]> => {
        const users = await this.repository.getAll();
        // if(users.length === 0) throw new NotFoundError("No users found");
        return users;
    }
    getUserById = async (userId: string): Promise<User> => {
        const user = await this.repository.getById(userId);
        if (!user) throw new NotFoundError("User not found");
        return user;
    }
    getUserByEmail = async (email: string): Promise<User> => {
        const user = await this.repository.getByEmail(email);
        if (!user) throw new NotFoundError("User not found");
        return user;
    }
    createUser = async (user: CreateUserInput): Promise<User> => {
        return await this.repository.create(user);
    }
    updateUser = async (userId: string, updates: UpdateUserInput): Promise<User> => {
        const user = await this.repository.update(userId, updates);
        if (!user) throw new NotFoundError("User not found");
        return user;
    }
    deleteUser = async (userId: string): Promise<User> => {
        const user = await this.repository.delete(userId);
        if (!user) throw new NotFoundError("User not found");
        return user;
    }
}
