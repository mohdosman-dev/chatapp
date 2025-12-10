import { Router } from "express";
import authRouter from "./auth.route";
import userRoutes from "./user.route";
import chatRoutes from "./chat.route";
import messageRoutes from "./message.route";

const routes = Router();

// Auth
routes.use("/auth", authRouter);

// Users
routes.use("/users", userRoutes);

// Chats
routes.use("/chats", chatRoutes);

// Messages
routes.use("/messages", messageRoutes);

export default routes;
