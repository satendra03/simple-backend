import { FireStoreUserRepository } from "./repository/user.repository.js";
import { FireStoreUserService } from "./service/user.service.js";
import { UserController } from "./controller/user.controller.js";

const userRepository = new FireStoreUserRepository();
const userService = new FireStoreUserService(userRepository);
const userController = new UserController(userService);

export { userController };

