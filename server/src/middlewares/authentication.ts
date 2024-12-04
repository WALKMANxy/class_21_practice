import { NextFunction, Response } from "express";
import { User } from "../models/User";
import { getSessionByAccessToken } from "../utils/sessionUtils";
import { AuthenticatedRequest } from "../models/Types";

export const authenticateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const accessToken = req.header("Authorization")?.replace("Bearer ", "");

  if (!accessToken) {
    console.warn("No access token provided in request headers", {
      headers: req.headers,
    });
    res.status(401).json({
      success: false,
      message: "Access token not provided, authorization denied",
    });
    return; // Ensure the function exits after sending the response
  }

  try {
    const session = await getSessionByAccessToken(accessToken, req);

    if (!session) {
      console.warn("Invalid or expired session during authentication", {
        accessToken,
      });
      res.status(401).json({
        success: false,
        message: "Invalid or expired session",
      });
      return; // Exit the function
    }

    const user = await User.findById(session.userId);

    if (!user) {
      console.warn("User not found for session", { sessionId: session._id });
      res.status(401).json({ success: false, message: "User not found" });
      return; // Exit the function
    }

    req.user = {
      id: user._id,
      email: user.email,
      username: user.username,
      name: user.name,
    };

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Authentication error:", { error });
    res.status(500).json({ success: false, message: "Internal server error" });
    // Optionally, you can add `return;` here for consistency
  }
};
