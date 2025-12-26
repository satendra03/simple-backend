import { BadRequestError } from "@/shared/ApiError.js";
import { Request, Response, NextFunction } from "express";

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) return next(new BadRequestError("Email and password are required"));
    next();
}

export const validateSignup = (req: Request, res: Response, next: NextFunction) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) return next(new BadRequestError("Email, password and name are required"));
    next();
}
