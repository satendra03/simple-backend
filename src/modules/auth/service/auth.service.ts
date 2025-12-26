import { UserRepository } from "@/modules/user/repository/user.repository.interface.js";
import { signToken } from "@/utils/jwt.util.js";
import { comparePassword, hashPassword } from "@/utils/password.utils.js";
import { UnauthorizedError } from "@/shared/ApiError.js";
import { AuthService } from "./auth.service.interface.js";
import { CreateUserInput } from "@/modules/user/model/userInput.model.js";

export class FireStoreAuthService implements AuthService {
  constructor(private userRepository: UserRepository) { }

  login = async (email: string, password: string) => {
    const user = await this.userRepository.getByEmail(email);
    if (!user) throw new UnauthorizedError("Invalid credentials");

    const isValid = await comparePassword(password, user.password);
    if (!isValid) throw new UnauthorizedError("Invalid credentials");

    return signToken({
      userId: user.id,
      role: user.role,
    });
  }

  signup = async (user: CreateUserInput) => {
    const email = user.email.trim();
    const existingUser = await this.userRepository.getByEmail(email);
    if (existingUser) throw new UnauthorizedError("User already exists");

    const hashedPassword = await hashPassword(user.password);
    const newUser = await this.userRepository.create({
      ...user,
      password: hashedPassword,
    });

    return signToken({
      userId: newUser.id,
      role: newUser.role,
    });
  }
}
