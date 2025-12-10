import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { loginSchema, registerSchema } from "../validators/auth.validator";
import { loginService, registerService } from "../services/auth.service";
import { clearJwtCookie, setJwtCookie } from "../utils/cookie";
import { HTTPSTATUS } from "../config/http.config";
import { ZodError } from "zod";
import { Env } from "../config/env.config";
import { generateJwtToken } from "../utils/token";

export const registerController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = registerSchema.parse(req.body);

    const user = await registerService(body);
    const userId = user._id.toString();
    const isBrowser =
      typeof req.headers.origin === "string" ||
      (typeof req.headers["user-agent"] === "string" &&
        req.headers["user-agent"].toLowerCase().includes("mozilla"));
    if (isBrowser) {
      return setJwtCookie({ res, userId }).status(HTTPSTATUS.OK).send({
        message: "Registered successfully!",
        user,
      });
    }
    const token = generateJwtToken(userId);

    return res.status(HTTPSTATUS.OK).send({
      message: "Registered successfully!",
      user,
      token,
    });
  }
);

export const loginController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = loginSchema.parse(req.body);

    const user = await loginService(body);
    const userId = user._id.toString();
    const isBrowser =
      typeof req.headers.origin === "string" ||
      (typeof req.headers["user-agent"] === "string" &&
        req.headers["user-agent"].toLowerCase().includes("mozilla"));

    if (isBrowser) {
      return setJwtCookie({ res, userId }).status(HTTPSTATUS.OK).send({
        message: "Logged in successfully!",
        user,
      });
    }

    const token = generateJwtToken(userId);
    return res.status(HTTPSTATUS.OK).send({
      message: "Logged in successfully!",
      user,
      token,
    });
  }
);

export const logoutController = asyncHandler(
  async (req: Request, res: Response) => {
    return clearJwtCookie(res).status(HTTPSTATUS.OK).send({
      message: "Logged out successfully!",
    });
  }
);

export const authenticateStatus = asyncHandler(async (req, res) => {
  const user = req.user;
  return res.status(HTTPSTATUS.OK).send({ message: "Authenticated", user });
});
