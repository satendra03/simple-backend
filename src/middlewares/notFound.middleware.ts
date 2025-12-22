// src/middlewares/notFound.middleware.ts
import { ApiResponse } from "../shared/ApiResponse.js";
import { Request, Response, NextFunction } from "express";

export const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json(
    ApiResponse.error(`Route not found: ${req.method} ${req.originalUrl}`)
  );
};