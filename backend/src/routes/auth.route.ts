import { Router } from "express";
import {
  authenticateStatus,
  loginController,
  logoutController,
  registerController,
} from "../controllers/auth.controller";
import { passportJwtAuthenticate } from "../config/passport.config";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication management
 */

const authRouter = Router()
  /**
   * @swagger
   * /auth/register:
   *   post:
   *     summary: Register a new user
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - username
   *               - email
   *               - password
   *             properties:
   *               username:
   *                 type: string
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *               avatar:
   *                 type: string
   *     responses:
   *       201:
   *         description: User registered successfully
   */
  .post("/register", registerController)
  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: Log in a user
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Login successful
   */
  .post("/login", loginController)
  /**
   * @swagger
   * /auth/logout:
   *   post:
   *     summary: Log out a user
   *     tags: [Auth]
   *     responses:
   *       200:
   *         description: Logged out successfully
   */
  .post("/logout", logoutController)
  /**
   * @swagger
   * /auth/status:
   *   get:
   *     summary: Check authentication status
   *     tags: [Auth]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: User is authenticated
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                 user:
   *                   type: object
   *       401:
   *         description: Unauthorized
   */
  .get("/status", passportJwtAuthenticate, authenticateStatus);

export default authRouter;
