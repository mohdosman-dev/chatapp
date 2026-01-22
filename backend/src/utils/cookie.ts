import jwt, { SignOptions, Secret } from "jsonwebtoken";
import { Env } from "../config/env.config";
import { Response } from "express";
import { HTTPSTATUS } from "../config/http.config";

type Time = `${number}${"s" | "m" | "h" | "d" | "w" | "y"}`;
export const setJwtCookie = (res: Response, token: string) => {
  return res.cookie("accessToken", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: Env.ENV_MODE === "production" ? true : false,
    sameSite: Env.ENV_MODE === "production" ? "strict" : "lax",
  });
};

export const clearJwtCookie = (res: Response) =>
  res.clearCookie("accessToken", { path: "/" });
