import { BadRequestError } from "@/shared/ApiError.js";
import { Request, Response, NextFunction } from "express";

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    if (typeof body !== "object" || body === null) {
        return next(new BadRequestError("Invalid request body"));
    }
    
    const { email, password } = body;
    if ( typeof email !== "string" || typeof password !== "string" ) return next(new BadRequestError("Invalid input types"));
    if (!email || !password) return next(new BadRequestError("Email and password are required"));
    next();
}

export const validateSignup = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    if (typeof body !== "object" || body === null) {
        return next(new BadRequestError("Invalid request body"));
    }
    
    const { email, password, name } = body;

    if ( typeof email !== "string" || typeof password !== "string" ||
        (name !== undefined && typeof name !== "string")
    ) return next(new BadRequestError("Invalid input types"));

    if (!email || !password || !name) return next(new BadRequestError("Email, password and name are required"));
    next();
}
