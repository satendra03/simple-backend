import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../shared/ApiError.js";
import { verifyToken } from "../utils/jwt.util.js";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return next(new UnauthorizedError("Token missing"));

    try {
        const decoded = verifyToken(token);
        req.user = {
            id: decoded.userId,
            role: decoded.role
        };
        next();
    } catch (error) {
        next(new UnauthorizedError("Invalid token"));
    }
}