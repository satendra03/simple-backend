import { Router } from "express";
import { authController } from "./auth.module.js";
import { validateLogin } from "./validator/auth.validator.js";
import { validateSignup } from "./validator/auth.validator.js";

const authRouter = Router();

authRouter.get("/login", validateLogin, authController.login);
authRouter.post("/signup", validateSignup, authController.signup);

export default {
    path: "/auth",
    router: authRouter
};