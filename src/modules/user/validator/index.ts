import { Request, Response, NextFunction } from "express";
import { CreateUserDto } from "../dto/CreateUser.dto.js";
import { BadRequestError } from "@/shared/ApiError.js";
import { isEmail, isString } from "@/utils/index.js";
import { UpdateUserDto } from "../dto/UpdateUser.dto.js";

export const validateCreateUser = (req: Request, res: Response, next: NextFunction) => {
    const user = req.body as CreateUserDto;

    if (!user) return next(new BadRequestError("Invalid input"));
    if (!user.name) return next(new BadRequestError("User name is required"));
    if (!user.email) return next(new BadRequestError("User email is required"));
    if (!user.password) return next(new BadRequestError("User password is required"));
    if (!isEmail(user.email)) return next(new BadRequestError("Invalid user email"));
    if (!isString(user.name)) return next(new BadRequestError("Invalid user name"));
    if (!isString(user.password)) return next(new BadRequestError("Invalid user password"));

    next();
}

export const validateUserId = (req: Request, res: Response, next: NextFunction) => {
    let { userId } = req.params;

    userId = userId?.trim(); // No spaces
    if (!userId || !isString(userId)) return next(new BadRequestError("Invalid user ID"));
    req.params.userId = userId; // Normalize userId

    next();
}

export const validateUserEmail = (req: Request, res: Response, next: NextFunction) => {
    let { email } = req.body;

    if (typeof email !== "string") {
        return next(new BadRequestError("Invalid user email"));
    }
    email = decodeURIComponent(email);

    if (!isEmail(email)) return next(new BadRequestError("Invalid user email"));
    req.body.email = email.trim().toLowerCase();
    next();
}

export const validateUpdateUser = (req: Request, res: Response, next: NextFunction) => {
    const updates = req.body as UpdateUserDto;

    if (!updates) return next(new BadRequestError("Invalid input"));
    if (Object.keys(updates).length === 0) return next(new BadRequestError("At least one field is required to update"));
    
    next();
}
