//src/config/config.ts
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

const nodeEnv = process.env.NODE_ENV;

const loadEnvFile = () => {
  const envFile = path.resolve(process.cwd(), `.env.${nodeEnv}`);

  if (fs.existsSync(envFile)) {
    console.log(`Loading environment variables from ${envFile}`);
    dotenv.config({ path: envFile });
  } else {
    console.warn(
      `No .env.${nodeEnv} file found. Using default environment variables.`
    );
    dotenv.config();
  }
};

loadEnvFile();

export const config = {
  nodeEnv,
  jwtSecret: process.env.JWT_SECRET || "",
  mongoUri: process.env.MONGO_URI || "",
  port: process.env.PORT || "5000",
  baseUrl: process.env.BASE_URL || "",
  appUrl: process.env.APP_URL || "",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  refreshTokenDuration: process.env.REFRESH_TOKEN_DURATION || "7d",
  jwt: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || "",
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || "",
    accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY || "15m",
    refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || "7d",
  },
  sessionDuration: process.env.SESSION_DURATION || "7d",
};

// Validate required environment variables
const requiredEnvVars = ["JWT_SECRET", "MONGO_URI"];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`${envVar} is not set in the environment variables`);
    throw new Error(`${envVar} is not set in the environment variables`);
  }
});

console.log("Configuration loaded successfully", {
  environment: config.nodeEnv,
});
