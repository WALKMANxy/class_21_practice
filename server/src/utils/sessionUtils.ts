// src/utils/sessionUtils.ts
import { Request } from "express";
import ms from "ms";
import { config } from "../config/config";
import { IUser } from "../models/User";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshTokenJWT,
} from "./jwtUtils";
import { AuthenticatedRequest } from "../models/Types";
import { ISession, Session } from "../models/Session";
import { UserService } from "../services/userService";

const refreshTokenDurationMs = ms(config.jwt.refreshTokenExpiry);

export const createSession = async (
  user: Partial<IUser>,
  req: AuthenticatedRequest,
  uniqueId: string
): Promise<{ accessToken: string; refreshToken: string }> => {
  try {
    if (!user || !uniqueId) {
      console.error("Validation failed: user or uniqueId missing.", {
        user,
        uniqueId,
      });
      throw new Error("userId and uniqueId are required to create a session.");
    }

    const userId = user?._id?.toString();

    console.log("Attempting to create session", { userId, uniqueId });

    const userAgent = req.get("User-Agent") || "Unknown";

    const existingSession = await Session.findOne({
      userId,
      uniqueId,
      userAgent,
    });

    if (existingSession) {
      console.log("Found existing session. Invalidating session...");
      const invalidated = await invalidateSession(userId!, uniqueId, userAgent);
      if (!invalidated) {
        console.error("Failed to invalidate existing session.");
        throw new Error("Failed to invalidate existing session.");
      }
    }

    const newAccessToken = generateAccessToken(user as IUser, uniqueId);
    const newRefreshToken = generateRefreshToken(user as IUser);

    console.log("Saving new session to database", { userId, uniqueId });
    const session = new Session({
      userId,
      refreshToken: newRefreshToken,
      expiresAt: new Date(Date.now() + refreshTokenDurationMs),
      userAgent,
      uniqueId,
    });

    await session.save();
    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  } catch (error: unknown) {
    const typedError = error as {
      message: string;
      code?: number;
      stack?: string;
    };

    if (
      typedError.message.includes("E11000") &&
      typedError.message.includes("dup key")
    ) {
      console.error("Duplicate session detected", {
        error: typedError.message,
        stack: typedError.stack,
        userId: user?._id,
        uniqueId,
      });
      throw new Error("DUPLICATE_SESSION");
    }

    console.error("Error creating session", {
      error: typedError.message,
      stack: typedError.stack,
      userId: user?._id,
      uniqueId,
    });
    throw error;
  }
};

export const getSessionByAccessToken = async (
  accessToken: string,
  req: Request
): Promise<ISession | null> => {
  try {
    const decoded = verifyAccessToken(accessToken);
    const userId = decoded.userId;
    const userAgent = req.get("User-Agent");
    const uniqueId = decoded.uniqueId;

    if (!uniqueId && !userAgent) {
      console.warn(
        "Session identifiers not provided in the request for session retrieval.",
        { userId }
      );
      return null;
    }

    const session = await Session.findOne(
      {
        userId,
        userAgent,
        uniqueId,
        expiresAt: { $gt: new Date() },
      },
      { _id: 1, userId: 1, userAgent: 1, uniqueId: 1, expiresAt: 1 }
    );

    if (!session) {
      console.warn("No valid session found for the provided access token", {
        userId,
        userAgent,
        uniqueId,
      });
      return null;
    }

    return session;
  } catch (error: unknown) {
    const typedError = error as { message: string; stack?: string };
    console.error("Error fetching session by Access Token", {
      accessToken,
      error: typedError.message,
      stack: typedError.stack,
    });
    return null;
  }
};

export const renewSession = async (
  refreshToken: string,
  req: Request,
  uniqueId: string
): Promise<{ accessToken: string; refreshToken: string } | null> => {
  try {
    if (!refreshToken) {
      console.warn("No refresh token provided");
      return null;
    }

    const session = await Session.findOne({ refreshToken, uniqueId });

    if (!session) {
      console.warn("Invalid refresh token", { refreshToken });
      return null;
    }

    if (uniqueId && session.uniqueId !== uniqueId) {
      console.warn("Unique identifier mismatch during token refresh", {
        sessionId: session._id,
        storedUniqueId: session.uniqueId,
        incomingUniqueId: uniqueId,
      });
      return null;
    }

    let decodedToken;
    try {
      decodedToken = verifyRefreshTokenJWT(refreshToken);
    } catch (err) {
      console.warn("Invalid or expired refresh token", {
        refreshToken,
        error: err,
      });
      return null;
    }

    const userId = decodedToken.userId;
    if (!userId) {
      console.warn("Refresh token does not contain userId", { refreshToken });
      return null;
    }

    const userAgent = req.get("User-Agent") || "Unknown";

    if (session.expiresAt < new Date()) {
      console.warn("Refresh token expired", { sessionId: session._id });
      await invalidateSession(userId!, uniqueId, userAgent);
      return null;
    }

    const incomingUserAgent = req.get("User-Agent");
    if (session.userAgent !== incomingUserAgent) {
      console.warn("User-Agent mismatch during token refresh", {
        sessionId: session._id,
        storedUserAgent: session.userAgent,
        incomingUserAgent,
      });
      return null;
    }

    const user = await UserService.getUserById(session.userId.toString());
    if (!user) {
      console.warn("User not found for session", { sessionId: session._id });
      return null;
    }

    const newAccessToken = generateAccessToken(user, uniqueId);
    const newRefreshToken = generateRefreshToken(user);

    session.refreshToken = newRefreshToken;
    session.expiresAt = new Date(Date.now() + refreshTokenDurationMs);
    await session.save();

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  } catch (error) {
    console.error("Error refreshing session", { refreshToken, error });
    throw error;
  }
};

export const invalidateSession = async (
  userId: string,
  uniqueId: string,
  userAgent: string
): Promise<boolean> => {
  console.log(`invalidateSession called with:`, {
    userId,
    uniqueId,
    userAgent,
  });
  try {
    const result = await Session.deleteOne({ userId, uniqueId, userAgent });
    console.log(`Deleted session:`, result);
    console.log("Session invalidated", { userId, uniqueId, userAgent });
    return true;
  } catch (error) {
    console.error("Error invalidating session", {
      userId,
      uniqueId,
      userAgent,
      error,
    });
    console.error("Error invalidating session", {
      userId,
      uniqueId,
      userAgent,
      error,
    });
    return false;
  }
};
``;
