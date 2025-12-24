import { Router } from "express";
import { validateCreateUser, validateUpdateUser, validateUserEmail, validateUserId } from "./validator/index.js";
import { userController } from "./user.module.js";

const userRouter = Router();

userRouter.get("/", userController.getAllUsers);
userRouter.get("/:userId", validateUserId, userController.getUserById);
userRouter.post("/", validateCreateUser, userController.createUser);
userRouter.patch("/:userId", validateUserId, validateUserEmail, validateUpdateUser, userController.updateUser);
userRouter.delete("/:userId", validateUserId, userController.deleteUser);

export default userRouter;