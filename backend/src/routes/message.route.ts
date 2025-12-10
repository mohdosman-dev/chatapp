import { Router } from "express";
import { passportJwtAuthenticate } from "../config/passport.config";
import {
  getMessagesController,
  sendMessageController,
} from "../controllers/message.controller";

const messageRoutes = Router()
  .use(passportJwtAuthenticate)
  .post("/send", sendMessageController)
  .get("/:chatId", getMessagesController);

export default messageRoutes;
