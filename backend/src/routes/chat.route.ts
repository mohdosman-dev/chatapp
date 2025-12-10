import { Router } from "express";
import { passportJwtAuthenticate } from "../config/passport.config";
import {
  createChatController,
  getSingleChatController,
  getUserChatsController,
} from "../controllers/chat.controller";

const chatRoutes = Router()
  .use(passportJwtAuthenticate)
  .post("/", createChatController)
  .get("/", getUserChatsController)
  .get("/:id", getSingleChatController);

export default chatRoutes;
