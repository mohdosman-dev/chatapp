import { Server as HTTPServer } from "http";
import { Server, type Socket } from "socket.io";
import { InternalServerError, UnauthorizedError } from "../utils/app-error";
import { decodeToken } from "../utils/token";
import { validateChatParticipants } from "../services/chats.service";

interface AuthenticatedSocket extends Socket {
  userId?: string;
}

let io: Server | null = null;

// Online map
const onlineUsers = new Map<string, string>();

export const initializeSocket = async (httpServer: HTTPServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*",
      credentials: true,
      methods: ["GET", "POST"],
    },
  });

  io.use(async (socket: AuthenticatedSocket, next) => {
    try {
      const rawCookies = socket.handshake.headers.cookie;
      if (!rawCookies) return next(new UnauthorizedError());

      const token = rawCookies.split("=")[1];
      if (!token) return next(new UnauthorizedError());

      const decodedToken = decodeToken(token);
      if (!decodedToken) return next(new UnauthorizedError());
      socket.userId = decodedToken.userId;

      next();
    } catch (error) {
      next(new InternalServerError());
    }
  });

  io.on("connection", (socket: AuthenticatedSocket) => {
    if (!socket.userId) {
      socket.disconnect(true);
      return;
    }
    const userId = socket.userId;
    const newSocketId = socket.id;

    console.log("Socket connected", { userId, newSocketId });
    onlineUsers.set(userId, newSocketId);

    // Broadcast the online users list
    io?.emit("online:users", Array.from(onlineUsers.keys()));

    // Create personal room
    socket.join(`user:${userId}`);

    socket.on(
      "chat:join",
      async (chatId: string, callback?: (err?: string) => void) => {
        try {
          const chat = await validateChatParticipants(userId, chatId);
          socket.join(`chat:${chatId}`);
          callback?.();
        } catch (error) {
          callback?.(`Error while joining the chat - ${error}`);
        }
      }
    );

    socket.on("chat:leave", (chatId) => {
      if (chatId) {
        socket.leave(`chat:${chatId}`);
        console.log(`User ${userId} left chat ${chatId}`);
      }
    });

    socket.on("disconnect", () => {
      if (userId) {
        if (onlineUsers.get(userId) === newSocketId) {
          onlineUsers.delete(userId);
        }
        io?.emit("online:users", Array.from(onlineUsers.keys()));
      }
    });
  });
};

const getIO = () => {
  if (!io) throw new Error("SocketIO not initialized yet!");
  return io;
};

export const emitNewChatToParticipants = (
  participants: string[] = [],
  chat: any
) => {
  const io = getIO();

  for (const participantId of participants) {
    io.to(`user:${participantId}`).emit("chat:new", chat);
  }
};

export const emitNewMessageToRoom = (
  senderId: string, // userId
  chatId: string,
  message: any
) => {
  const io = getIO();
  const senderSocketId = onlineUsers.get(senderId);

  if (senderSocketId) {
    io.to(`chat:${chatId}`).except(senderSocketId).emit("message:new", message);
  } else {
    io.to(`chat:${chatId}`).emit("message:new", message);
  }
};

export const emitLastMessageToParticipants = (
  participants: string[] = [],
  chatId: string,
  lastMessage: any
) => {
  const io = getIO();
  const payload = { chatId, lastMessage };

  for (const participantId of participants) {
    io.to(`chat:${chatId}`).emit("chat:update", payload);
  }
};
