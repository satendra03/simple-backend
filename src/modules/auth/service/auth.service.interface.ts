import { CreateUserInput } from "@/modules/user/model/userInput.model.js";

export interface AuthService {
    login: (email: string, password: string) => Promise<string>;
    signup: (user: CreateUserInput) => Promise<string>;
}