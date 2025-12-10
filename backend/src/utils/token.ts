import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { Env } from "../config/env.config";

type Time = `${number}${"s" | "m" | "h" | "d" | "w" | "y"}`;

export const generateJwtToken = (userId: string) => {
  const payload = { userId };
  const expiresIn = Env.JWT_EXPIRES_IN as Time;

  const signOptions: SignOptions = {
    audience: "user",
    expiresIn: expiresIn || "7d",
  };

  const token = jwt.sign(payload, Env.JWT_SECRET as Secret, signOptions);
  return token;
};

export const decodeToken = (token?: string): { userId: string } | null => {
  if (!token) return null;
  const decodedToken = jwt.verify(token, Env.JWT_SECRET) as {
    userId: string;
  } | null;
  return decodedToken;
};
