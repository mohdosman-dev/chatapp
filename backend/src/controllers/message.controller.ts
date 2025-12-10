import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { sendMessageSchema } from "../validators/message.validator";
import {
  getMessagesService,
  sendMessageServices,
} from "../services/message.service";
import { HTTPSTATUS } from "../config/http.config";

export const sendMessageController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const body = sendMessageSchema.parse(req.body);

    const { message, chatId } = await sendMessageServices(userId, body);

    return res.status(HTTPSTATUS.CREATED).send({
      message: "Message sent successfully!",
      data: message,
      chatId: chatId,
    });
  }
);

export const getMessagesController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const { chatId } = req.params;

    const { messages, chat } = await getMessagesService(userId, chatId);

    return res.status(HTTPSTATUS.OK).send({
      message: "Chat messages retrieved successfully!",
      chat,
      messages,
    });
  }
);
