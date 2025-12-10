import { getEnv } from "../utils/get-env";

export const Env = {
  ENV_MODE: getEnv("ENV_MODE", "development"),
  PORT: getEnv("PORT", "3000"),
  MONGO_URI: getEnv("MONGO_URL"),
  JWT_SECRET: getEnv("JWT_SECRET", "your_secret_here"),
  JWT_EXPIRES_IN: getEnv("JWT_EXPIRES_IN", "7d"),
  FORNT_END_ORIGIN: getEnv("FORNT_END_ORIGIN", "http://localhost:5173"),
} as const;
