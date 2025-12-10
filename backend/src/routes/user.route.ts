import { Router } from "express";
import { passportJwtAuthenticate } from "../config/passport.config";
import { getUsersController } from "../controllers/users.controller";

const userRoutes = Router().get(
  "/",
  passportJwtAuthenticate,
  getUsersController
);

export default userRoutes;
