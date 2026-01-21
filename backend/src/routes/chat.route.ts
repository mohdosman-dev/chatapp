import { Router } from "express";
import { passportJwtAuthenticate } from "../config/passport.config";
import {
  createChatController,
  getSingleChatController,
  getUserChatsController,
} from "../controllers/chat.controller";

const chatRoutes = Router()
  .use(passportJwtAuthenticate)
  /**
   * @swagger
   * /chats:
   *   post:
   *     summary: Create a new chat or get existing one
   *     tags: [Chats]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               participant:
   *                 type: string
   *                 description: ID of the user to chat with (for 1-on-1)
   *               participants:
   *                 type: array
   *                 items:
   *                   type: string
   *                 description: Array of user IDs (for group chats)
   *               isGroup:
   *                 type: boolean
   *                 default: false
   *               groupName:
   *                 type: string
   *                 description: Required if isGroup is true
   *     responses:
   *       201:
   *         description: Chat created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                 chat:
   *                   type: object
   *       400:
   *         description: Invalid input
   *       401:
   *         description: Unauthorized
   */
  .post("/", createChatController)
  /**
   * @swagger
   * /chats:
   *   get:
   *     summary: Get all chats for the current user
   *     tags: [Chats]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Chats retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                 chats:
   *                   type: array
   *                   items:
   *                     type: object
   *       401:
   *         description: Unauthorized
   */
  .get("/", getUserChatsController)
  /**
   * @swagger
   * /chats/{id}:
   *   get:
   *     summary: Get a single chat by ID
   *     tags: [Chats]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Chat ID
   *     responses:
   *       200:
   *         description: Chat details retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                 chat:
   *                   type: object
   *                 messages:
   *                   type: array
   *                   items:
   *                     type: object
   *       404:
   *         description: Chat not found
   *       401:
   *         description: Unauthorized
   */
  .get("/:id", getSingleChatController);

export default chatRoutes;
