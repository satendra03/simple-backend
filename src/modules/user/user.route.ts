import { Router } from "express";
import { validateCreateUser, validateUpdateUser, validateUserEmail, validateUserId } from "./validator/index.js";
import { userController } from "./user.module.js";
import { authMiddleware } from "@/middlewares/auth.middleware.js";
import { isAdmin } from "@/middlewares/admin.middleware.js";

const userRouter = Router();
userRouter.use(authMiddleware);

userRouter.get("/", isAdmin, userController.getAllUsers);
userRouter.get("/:userId", validateUserId, userController.getUserById);
userRouter.post("/", isAdmin, validateCreateUser, userController.createUser); // Admin only creation
userRouter.patch("/:userId", validateUserId, validateUserEmail, validateUpdateUser, userController.updateUser);
userRouter.delete("/:userId", isAdmin, validateUserId, userController.deleteUser);

export default {
    path: "/users",
    router: userRouter
};