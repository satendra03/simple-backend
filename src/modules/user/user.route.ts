import { Router } from "express";
import { validateCreateUser, validateUpdateUser, validateUserEmail, validateUserId } from "./validator/index.js";
import { userController } from "./user.module.js";
import { authMiddleware } from "@/middlewares/auth.middleware.js";
import { isAdmin } from "@/middlewares/admin.middleware.js";

const userRouter = Router();

userRouter.use(authMiddleware); // Apply to all user routes
userRouter.get("/", userController.getAllUsers); // Get All Users
userRouter.get("/:userId", validateUserId, userController.getUserById); // Get User By Id
userRouter.get("/:email", validateUserEmail, userController.getUserByEmail); // Get User By Email
userRouter.post("/", isAdmin, validateCreateUser, userController.createUser); // Admin only creation
userRouter.patch("/:userId", isAdmin, validateUserId, validateUserEmail, validateUpdateUser, userController.updateUser); // Update User
userRouter.delete("/:userId", isAdmin, validateUserId, userController.deleteUser); // Delete User

export default {
    path: "/users",
    router: userRouter
};