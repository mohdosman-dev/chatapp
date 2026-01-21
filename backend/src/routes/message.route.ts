import { Router } from "express";
import { passportJwtAuthenticate } from "../config/passport.config";
import {
  getMessagesController,
  sendMessageController,
} from "../controllers/message.controller";

const messageRoutes = Router()
  .use(passportJwtAuthenticate)
  /**
   * @swagger
   * /messages/send:
   *   post:
   *     summary: Send a message to a chat
   *     tags: [Messages]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - chatId
   *             properties:
   *               chatId:
   *                 type: string
   *               content:
   *                 type: string
   *               image:
   *                 type: string
   *                 description: Base64 string or image URL
   *               replyToId:
   *                 type: string
   *     responses:
   *       201:
   *         description: Message sent successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                 data:
   *                   type: object
   *                 chatId:
   *                   type: string
   *       400:
   *         description: Invalid input
   *       401:
   *         description: Unauthorized
   */
  .post("/send", sendMessageController)
  /**
   * @swagger
   * /messages/{chatId}:
   *   get:
   *     summary: Get messages for a specific chat
   *     tags: [Messages]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: chatId
   *         required: true
   *         schema:
   *           type: string
   *         description: Chat ID
   *     responses:
   *       200:
   *         description: Chat messages retrieved successfully
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
  .get("/:chatId", getMessagesController);

export default messageRoutes;
