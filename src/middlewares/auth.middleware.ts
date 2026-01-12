import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../shared/ApiError.js";
import { JwtPayload, verifyAccessToken } from "../utils/jwt.util.js";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization?.split(" ")[1];
    if (!accessToken) return next(new UnauthorizedError("Access token missing"));

    try {
        const decoded: JwtPayload = verifyAccessToken(accessToken);
        req.user = {
            userId: decoded.userId,
            role: decoded.role
        };
        next();
    } catch (error) {
        next(new UnauthorizedError("Invalid access token"));
    }
}