import { Router } from "express";
import {
  authenticateStatus,
  loginController,
  logoutController,
  registerController,
} from "../controllers/auth.controller";
import { passportJwtAuthenticate } from "../config/passport.config";

const authRouter = Router()
  .post("/register", registerController)
  .post("/login", loginController)
  .post("/logout", logoutController)
  .get("/status", passportJwtAuthenticate, authenticateStatus);
  
export default authRouter;
