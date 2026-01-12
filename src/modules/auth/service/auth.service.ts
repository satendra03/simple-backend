import { JwtPayload, signRefreshToken, signAccessToken, verifyRefreshToken } from "@/utils/jwt.util.js";
import { comparePassword, hashPassword } from "@/utils/password.utils.js";
import { UnauthorizedError } from "@/shared/ApiError.js";
import { AuthService } from "./auth.service.interface.js";
import { CreateUserInput } from "@/modules/user/model/userInput.model.js";
import { UserService } from "@/modules/user/service/user.service.interface.js";

export class FireStoreAuthService implements AuthService {
  constructor(private userService: UserService) { }

  login = async (email: string, password: string): Promise<{ accessToken: string, refreshToken: string }> => {
    const user = await this.userService.getUserByEmail(email);
    if (!user) throw new UnauthorizedError("Invalid credentials");

    const isValid = await comparePassword(password, user.password);
    if (!isValid) throw new UnauthorizedError("Invalid credentials");

    const payload: JwtPayload = {
      userId: user.id,
      role: user.role,
    };

    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    return { accessToken, refreshToken };
  }

  logout = async (userId: string) => {
    await this.userService.updateUser(userId, { refreshToken: null });
  }

  signup = async (user: CreateUserInput): Promise<{ accessToken: string, refreshToken: string }> => {
    const email = user.email;
    const password = user.password;
    const existingUser = await this.userService.getUserByEmail(email);
    if (existingUser) throw new UnauthorizedError("User already exists");

    const hashedPassword = await hashPassword(password);
    const newUser = await this.userService.createUser({
      ...user,
      password: hashedPassword,
    });

    const payload: JwtPayload = {
      userId: newUser.id,
      role: newUser.role,
    };

    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    return { accessToken, refreshToken };
  }

  refresh = async (refreshToken: string): Promise<{ accessToken: string }> => {
    if(!refreshToken) throw new UnauthorizedError("Refresh token missing");
    try {
      const { userId, role } = verifyRefreshToken(refreshToken);
      // Check for same user
      const user = await this.userService.getUserById(userId);
      if (!user) throw new UnauthorizedError("User not found");
      if(user.refreshToken !== refreshToken) throw new UnauthorizedError("Refresh token mismatch");

      const accessToken = signAccessToken({userId, role});
      return { accessToken };
    } catch (error) {
      throw new UnauthorizedError("Invalid refresh token");
    }
  }
}
