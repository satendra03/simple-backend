import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    res.on("finish", () => {
        const { method, originalUrl } = req;
        const userId = req.user?.userId|| "Guest";

        // Format time: YYYY-MM-DD HH:mm:ss
        const now = new Date();
        const formattedTime = now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }); // Using local time

        const logMessage = `${userId} accessed ${method}${originalUrl} at ${formattedTime}\n`;

        // Append to log.txt in the project root
        const logFilePath = path.join(process.cwd(), "log.txt");

        fs.appendFile(logFilePath, logMessage, (err) => {
            if (err) {
                console.error("Failed to write to log file:", err);
            }
        });
    });

    next();
};
