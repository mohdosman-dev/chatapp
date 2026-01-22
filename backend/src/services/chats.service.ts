import mongoose from "mongoose";
import Chat, { ChatDocument } from "../models/chat.model";
import { CreateChatSchema } from "../validators/chat.validator";
import User from "../models/user.model";
import { BadRequestError, NotFoundError } from "../utils/app-error";
import Message from "../models/message.model";
import { emitNewChatToParticipants } from "../libs/socket";

export const getUserChatsService = async (userId: string) => {
  const chats = await Chat.find({
    participants: { $in: [userId] },
  })
    .populate("participants", "name avatar")
    .populate("lastMessage")
    .sort({ updatedAt: -1 });

  return chats;
};

export const createChatService = async (
  userId: string,
  body: {
    participant?: string;
    participants?: string[];
    isGroup?: boolean;
    groupName?: string;
  },
): Promise<ChatDocument> => {
  const { participant: participantId, participants, isGroup, groupName } = body;
  let chat: ChatDocument;
  let allParticipants: string[] = [];

  if (isGroup && participants?.length && groupName) {
    allParticipants = [userId, ...participants];

    chat = await Chat.create({
      participants: allParticipants.map(
        (id) => new mongoose.Types.ObjectId(id),
      ),
      isGroup: isGroup,
      groupName: groupName,
      createdBy: new mongoose.Types.ObjectId(userId),
    });
  } else {
    if (!participantId)
      throw new BadRequestError("Other participant is required");
    const otherUser = await User.findById(participantId);
    if (!otherUser)
      throw new BadRequestError("Cannot create chat with this user");
    allParticipants = [userId, participantId];
    const exsistingChat = await Chat.findOne({
      participants: {
        $all: allParticipants.map((id) => new mongoose.Types.ObjectId(id)),
        $size: 2,
      },
    }).populate("participants", "name avatar");
    if (exsistingChat) return exsistingChat;

    chat = await Chat.create({
      participants: allParticipants.map(
        (id) => new mongoose.Types.ObjectId(id),
      ),
      isGroup: false,
      createdBy: new mongoose.Types.ObjectId(userId),
    });
  }

  // TODO: Implement socket here
  const populatedChat = await chat.populate("participants", "name avatar");
  const participantIdString = populatedChat.participants?.map((p) =>
    p._id.toString(),
  );
  emitNewChatToParticipants(participantIdString, populatedChat);

  return chat;
};

export const getSingleChatServices = async (chatId: string, userId: string) => {
  const chat = await Chat.findOne({
    _id: chatId,
    participants: { $in: [userId] },
  }).populate("participants", "name avatar");

  if (!chat) throw new BadRequestError("Cannot find the chat");

  const messages = await Message.find({
    chatId: chatId,
  })
    .populate("sender", "_id name avatar")
    .populate({
      path: "replyTo",
      select: "content image sender",
      populate: {
        path: "sender",
        select: "_id name avatar",
      },
    })
    .sort({ createdAt: -1 });
  return {
    chat,
    messages,
  };
};

export const validateChatParticipants = async (
  userId: string,
  chatId: string,
) => {
  const chat = await Chat.findOne({
    _id: chatId,
    participants: { $in: [userId] },
  });

  if (!chat) throw new NotFoundError("Cannot find the chat");

  return chat;
};
