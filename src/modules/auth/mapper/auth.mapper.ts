import { CreateUserInput } from "@/modules/user/model/userInput.model.js";
import { AuthResponseDto } from "../dto/AuthResponse.dto.js";
import { SignupUserDto } from "../dto/SignupUser.dto.js";

export class AuthMapper {
    static toResponseDto({accessToken, refreshToken}: {accessToken: string, refreshToken: string}): AuthResponseDto {
        return {
            accessToken,
            refreshToken,
        };
    }

    static toSignupInput(user: SignupUserDto): CreateUserInput {
        let { email, password, name, role } = user;
        return {
            email: email.trim().toLowerCase(),
            password: password.trim(),
            name: name.trim(),
            role: role ?? "user",
            refreshToken: null,
        };
    }
    
}