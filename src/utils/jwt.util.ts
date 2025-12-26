import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export interface JwtPayload {
  userId: string;
  role: "user" | "admin";
}

export const signToken = (payload: JwtPayload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

export const verifyToken = (token: string) =>
  jwt.verify(token, JWT_SECRET) as JwtPayload;
