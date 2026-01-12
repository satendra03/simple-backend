import { CreateUserInput } from "@/modules/user/model/userInput.model.js";

export interface AuthService {
    login: (email: string, password: string) => Promise<{accessToken: string, refreshToken: string}>;
    logout: (userId: string) => Promise<void>;
    signup: (user: CreateUserInput) => Promise<{accessToken: string, refreshToken: string}>;
    refresh: (refreshToken: string) => Promise<{accessToken: string}>;
}