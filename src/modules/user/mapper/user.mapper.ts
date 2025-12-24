import { CreateUserDto } from "../dto/CreateUser.dto.js";
import { UpdateUserDto } from "../dto/UpdateUser.dto.js";
import { UserResponseDto } from "../dto/UserResponse.dto.js";
import { User } from "../model/user.model.js";
import { CreateUserInput, UpdateUserInput } from "../model/userInput.model.js";

export class UserMapper {
    static toResponseDto(user: User): UserResponseDto {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    }
    static toResponseDtoList(users: User[]): UserResponseDto[] {
        return users.map(user => this.toResponseDto(user));
    }
    static toCreateInput(user: CreateUserDto): CreateUserInput {
        return {
            name: user.name,
            email: user.email,
            password: user.password,
        };
    }
    static toUpdateInput(user: UpdateUserDto): UpdateUserInput {
        const userInput: UpdateUserInput = {};

        if (user.name !== undefined) userInput.name = user.name;
        if (user.email !== undefined) userInput.email = user.email;
        if (user.password !== undefined) userInput.password = user.password;

        return userInput;
    }
}