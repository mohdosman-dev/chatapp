import "dotenv/config";
import "./config/passport.config";
import cookieParser from "cookie-parser";
import http from "http";
import express, { Request, Response } from "express";
import cors from "cors";
import { Env } from "./config/env.config";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "./config/http.config";
import connectDatabase from "./config/database.config";
import passport from "passport";
import routes from "./routes";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { initializeSocket } from "./libs/socket";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.config";

const app = express();
const server = http.createServer(app);

initializeSocket(server);

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: Env.FORNT_END_ORIGIN,
  }),
);
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", routes);

app.get(
  "/health",
  asyncHandler(async (req: Request, res: Response) => {
    res.status(HTTPSTATUS.OK).send({});
  }),
);

app.use(errorHandler);

app.listen(Env.PORT, async () => {
  await connectDatabase();
  console.log(`Server running on port ${Env.PORT} in ${Env.ENV_MODE} mode`);
});
