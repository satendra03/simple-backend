import { signToken } from "@/utils/jwt.util.js";
import { comparePassword, hashPassword } from "@/utils/password.utils.js";
import { UnauthorizedError } from "@/shared/ApiError.js";
import { AuthService } from "./auth.service.interface.js";
import { CreateUserInput } from "@/modules/user/model/userInput.model.js";
import { UserService } from "@/modules/user/service/user.service.interface.js";

export class FireStoreAuthService implements AuthService {
  constructor(private userService: UserService) { }

  login = async (email: string, password: string) => {
    const user = await this.userService.getUserByEmail(email);
    if (!user) throw new UnauthorizedError("Invalid credentials");

    const isValid = await comparePassword(password, user.password);
    if (!isValid) throw new UnauthorizedError("Invalid credentials");

    return signToken({
      userId: user.id,
      role: user.role,
    });
  }

  signup = async (user: CreateUserInput) => {
    const email = user.email;
    const existingUser = await this.userService.getUserByEmail(email);
    if (existingUser) throw new UnauthorizedError("User already exists");

    const hashedPassword = await hashPassword(user.password);
    const newUser = await this.userService.createUser({
      ...user,
      password: hashedPassword,
    });

    return signToken({
      userId: newUser.id,
      role: newUser.role,
    });
  }
}
