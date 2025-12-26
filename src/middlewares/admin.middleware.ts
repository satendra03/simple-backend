
import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../shared/ApiError.js";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== "admin") {
        return next(new UnauthorizedError("Admin access required"));
    }
    next();
};
