import { ApiResponse } from "@/shared/ApiResponse.js";
import { NextFunction, Request, Response } from "express";
import { AuthService } from "../service/auth.service.interface.js";
import { AuthMapper } from "../mapper/auth.mapper.js";
import { SignupUserDto } from "../dto/SignupUser.dto.js";
import { LoginUserDto } from "../dto/LoginUser.dto.js";
import { CreateUserInput } from "@/modules/user/model/userInput.model.js";

export class AuthController {
  constructor(private authService: AuthService) { }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as LoginUserDto;

      const { accessToken, refreshToken } = await this.authService.login(email, password);
      const response = AuthMapper.toResponseDto({ accessToken, refreshToken });

      res.status(200).json(ApiResponse.success({
        message: "Login successful",
        data: response,
      }));
    } catch (error) {
      next(error);
    }
  };

  signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, name, role } = req.body as SignupUserDto;
      const user: CreateUserInput = AuthMapper.toSignupInput({ email, password, name, role });

      const { accessToken, refreshToken } = await this.authService.signup(user);
      const response = AuthMapper.toResponseDto({ accessToken, refreshToken });

      res.status(201).json(ApiResponse.success({
        message: "Signup successful",
        data: response,
      }));
    } catch (error) {
      next(error);
    }
  };
}
