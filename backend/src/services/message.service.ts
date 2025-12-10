import {
  emitLastMessageToParticipants,
  emitNewMessageToRoom,
} from "../libs/socket";
import Chat from "../models/chat.model";
import Message from "../models/message.model";
import { BadRequestError, NotFoundError } from "../utils/app-error";
import { saveBase64Image } from "../utils/utils";

export const sendMessageServices = async (
  userId: string,
  body: {
    chatId: string;
    content?: string;
    image?: string;
    replyToId?: string;
  }
) => {
  const { chatId, content, image, replyToId } = body;

  const chat = await Chat.findOne({
    _id: chatId,
    participants: {
      $in: [userId],
    },
  });
  if (!chat) throw new NotFoundError("Cannot find chat");

  if (replyToId) {
    const replyToMessage = await Message.findOne({
      _id: replyToId,
      chatId: chatId,
    });
    if (!replyToMessage)
      throw new NotFoundError("Cannot find message to reply to");
  }

  let imageUrl: string;
  if (image) {
    //* Upload the image to cloud or to the local an get the url
    imageUrl = saveBase64Image(image);
  }

  const message = await Message.create({
    chatId: chatId,
    content: content,
    image: image,
    sender: userId,
    replyTo: replyToId,
  });

  await message.populate([
    {
      path: "sender",
      select: "name avatar",
    },
    {
      path: "replyTo",
      select: "content image sender",
      populate: {
        path: "sender",
        select: "name avatar",
      },
    },
  ]);

  chat.lastMessage = message._id;
  await chat.save();

  // Send to
  emitNewMessageToRoom(userId, chatId, message);

  const allParticipants = chat.participants?.map((id) => id.toString());
  emitLastMessageToParticipants(allParticipants, chatId, message);

  return { message, chatId };
};

export const getMessagesService = async (userId: string, chatId: string) => {
  const chat = await Chat.findOne({
    _id: chatId,
    participants: {
      $in: [userId],
    },
  }).populate("participants", "name avatar");
  if (!chat) throw new BadRequestError("Cannot find the chat!");

  const messages = await Message.find({
    chatId: chatId,
  }).populate([
    {
      path: "sender",
      select: "name avatar",
    },
    {
      path: "replyTo",
      select: "content image sender",
      populate: {
        path: "sender",
        select: "name avatar",
      },
    },
  ]);

  return { messages, chat };
};
