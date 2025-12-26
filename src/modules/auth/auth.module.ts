
import { FireStoreAuthService } from "./service/auth.service.js";
import { AuthController } from "./controller/auth.controller.js";
import { FireStoreUserService } from "../user/service/user.service.js";
import { FireStoreUserRepository } from "../user/repository/user.repository.js";

const userRepository = new FireStoreUserRepository();
const userService = new FireStoreUserService(userRepository);
const authService = new FireStoreAuthService(userService);
const authController = new AuthController(authService);

export { authController };