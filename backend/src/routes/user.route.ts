import { Router } from "express";
import { passportJwtAuthenticate } from "../config/passport.config";
import { getUsersController } from "../controllers/users.controller";

const userRoutes = Router()
  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Get all users
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Users fetched successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                 users:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       _id:
   *                         type: string
   *                       username:
   *                         type: string
   *                       email:
   *                         type: string
   *                       avatar:
   *                         type: string
   *       401:
   *         description: Unauthorized
   */
  .get(
    "/",
    passportJwtAuthenticate,
    getUsersController
  );

export default userRoutes;
