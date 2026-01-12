import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export interface JwtPayload {
  userId: string;
  role: "user" | "admin";
}

// Access Token
export const signAccessToken = (payload: JwtPayload): string => jwt.sign(payload, ACCESS_SECRET, { expiresIn: "1h" });
export const verifyAccessToken = (token: string): JwtPayload => jwt.verify(token, ACCESS_SECRET) as JwtPayload;

// Refresh Token
export const signRefreshToken = (payload: JwtPayload): string => jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });
export const verifyRefreshToken = (token: string): JwtPayload => jwt.verify(token, REFRESH_SECRET) as JwtPayload;