import { NextFunction, Response } from "express";
import { User } from "../models/User";
import { getSessionByAccessToken } from "../utils/sessionUtils";
import { AuthenticatedRequest } from "../models/Types";

export const authenticateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.header("Authorization")?.replace("Bearer ", "");

  if (!accessToken) {
    console.warn("No access token provided in request headers", {
      headers: req.headers,
    });
    return res.status(401).json({
      success: false,
      message: "Access token not provided, authorization denied",
    });
  }

  try {
    const session = await getSessionByAccessToken(accessToken, req);

    if (!session) {
      console.warn("Invalid or expired session during authentication", {
        accessToken,
      });
      return res
        .status(401)
        .json({ success: false, message: "Invalid or expired session" });
    }

    const user = await User.findById(session.userId);

    if (!user) {
      console.warn("User not found for session", { sessionId: session._id });
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    req.user = {
      id: user._id,
      email: user.email,
      name: user.name,
      surname: user.surname,
    };

    next();
  } catch (error) {
    console.error("Authentication error:", { error });
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
