import express from "express";
import { config } from "./config/config";
import mongoose from "mongoose";
import cors from "cors";
import { csp } from "./middlewares/csp";
import compression from "compression";
import helmet from "helmet";
import { rateLimiter } from "./middlewares/rateLimiter";
import authRoutes from "./routes/auth";
import userProfileRoutes from "./routes/userProfile";

const app = express();
const PORT = config.port;

mongoose
  .connect(config.mongoUri!, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", { error: err });
    process.exit(1); // Exit the app
  });

const corsOptions: cors.CorsOptions = {
  origin: config.appUrl,
  credentials: true,
  optionsSuccessStatus: 200,
};

console.log("CORS Origin:", corsOptions.origin);

app.use(helmet());
app.use(csp);
app.use(cors(corsOptions));
app.use(compression());
app.use(rateLimiter);
app.use(express.json());

app.use("/auth", authRoutes);
app.use("user", userProfileRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`, {
    port: PORT,
    environment: process.env.NODE_ENV || "development",
  });
});
