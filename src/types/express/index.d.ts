
import { Express } from "express";

declare global {
    namespace Express {
        interface Request {
            userId?: {
                userId: string;
            };
            user?: {
                id: string;
                role: "user" | "admin";
            }
        }
    }
}
