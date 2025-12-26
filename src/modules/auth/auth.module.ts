
import { FireStoreAuthService } from "./service/auth.service.js";
import { AuthController } from "./controller/auth.controller.js";
import { FireStoreUserRepository } from "../user/repository/user.repository.js";

const userRepository = new FireStoreUserRepository();
const authService = new FireStoreAuthService(userRepository);
const authController = new AuthController(authService);

export { authController };