import { ApiResponse } from "@/shared/ApiResponse.js";
import { NextFunction, Request, Response } from "express";
import { AuthService } from "../service/auth.service.interface.js";
import { CreateUserInput } from "@/modules/user/model/userInput.model.js";

export class AuthController {
  constructor(private authService: AuthService) {}

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const token = await this.authService.login(email, password);
      res.status(200).json(ApiResponse.success({
        message: "Login successful",
        data: token,
      }));
    } catch (err) {
      next(err);
    }
  };

  signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, name } = req.body as CreateUserInput;
      const token = await this.authService.signup({
        email,
        password,
        name,
      });
      res.status(200).json(ApiResponse.success({
        message: "Signup successful",
        data: token,
      }));
    } catch (err) {
      next(err);
    }
  };
}
