import swaggerJsdoc from "swagger-jsdoc";
import { Env } from "./env.config";
// import { version } from "../../package.json";
const version = "1.0.0";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Chat App API Docs",
      version,
      description: "API documentation for the Chat App backend",
    },
    servers: [
      {
        url: `http://localhost:${Env.PORT}/api`,
        description: "Local Development Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/models/*.ts"], // Path to the API docs
};

export const swaggerSpec = swaggerJsdoc(options);
