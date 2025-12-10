import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import {
  createChatSchema,
  getChatIdSchema,
} from "../validators/chat.validator";
import {
  createChatService,
  getSingleChatServices,
  getUserChatsService,
} from "../services/chats.service";
import { HTTPSTATUS } from "../config/http.config";

export const getUserChatsController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const chats = await getUserChatsService(userId);

    return res.status(HTTPSTATUS.OK).send({
      message: "Chats retreived successfully",
      chats,
    });
  }
);

export const createChatController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const body = createChatSchema.parse(req.body);

    const chat = await createChatService(userId, body);
    return res.status(HTTPSTATUS.CREATED).send({
      message: "Chat created successfully!",
      chat,
    });
  }
);

export const getSingleChatController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const { id: chatId } = getChatIdSchema.parse(req.params);

    const { chat, messages } = await getSingleChatServices(chatId, userId);

    return res.status(HTTPSTATUS.OK).send({
      message: "Messages retrieved successfully",
      chat,
      messages,
    });
  }
);
