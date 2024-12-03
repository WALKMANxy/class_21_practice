import { Request, Response } from "express";
import { loginUserService, registerUserService } from "../services/authService";
import {
  createSession,
  invalidateSession,
  renewSession,
} from "../utils/sessionUtils";
import { verifyRefreshTokenJWT } from "../utils/jwtUtils";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, name, surname } = req.body;

  try {
    await registerUserService(email, password, name, surname);
    res.status(201).json({
      message: "User registered successfully.",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Registration error:", error.message);
      res
        .status(500)
        .json({ message: "Registration failed", error: error.message });
    } else {
      console.error("Unexpected registration error:", error);
      res
        .status(500)
        .json({ message: "Registration failed", error: String(error) });
    }
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password, uniqueId } = req.body;

  if (!uniqueId) {
    res.status(400).json({ message: "uniqueId is required for login." });
  }

  try {
    const user = await loginUserService(email, password);
    if (!user) {
      res.status(400).json({ message: "Invalid credentials." });
      return;
    }

    const { accessToken, refreshToken } = await createSession(
      user,
      req,
      uniqueId
    );

    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
      id: user.id,
    });
  } catch (error: unknown) {
    const typedError = error as { message: string };

    if (typedError.message === "DUPLICATE_SESSION") {
      res.status(401).json({
        message: "Unauthorized",
      });
    }

    console.error("Login error:", error);
    res
      .status(500)
      .json({ message: "Login failed", error: "Internal server error." });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  const refreshToken =
    req.header("Authorization")?.replace("Bearer ", "") ?? "";
  const uniqueId = req.header("uniqueId");

  if (!refreshToken) {
    res.status(400).json({ message: "Refresh token is required for logout." });
  }

  let decodedToken;
  try {
    decodedToken = verifyRefreshTokenJWT(refreshToken);
  } catch (err) {
    console.warn("Invalid or expired refresh token", {
      refreshToken,
      error: err,
    });
    res.status(401).json({ message: "Invalid or expired refresh token." });
  }

  if (!decodedToken || !decodedToken.userId) {
    console.warn("Refresh token does not contain valid userId", {
      refreshToken,
    });
    res.status(401).json({ message: "Invalid refresh token payload." });
  }

  if (!decodedToken?.userId) {
    res.status(401).json({ message: "Invalid refresh token payload." });
    return;
  }

  const userId = decodedToken.userId;
  const userAgent = req.get("User-Agent") || "Unknown";

  try {
    const invalidated = await invalidateSession(userId, uniqueId!, userAgent!);
    if (invalidated) {
      res.status(200).json({ message: "Logout successful." });
    } else {
      res
        .status(400)
        .json({ message: "Logout failed. Invalid refresh token." });
    }
  } catch (error: unknown) {
    console.error("Error during logout:", { error });
    res
      .status(500)
      .json({ message: "Logout failed.", error: "Internal server error." });
  }
};

export const refreshSession = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { refreshToken, uniqueId } = req.body;

  if (!refreshToken || !uniqueId) {
    res
      .status(400)
      .json({ message: "Refresh token and uniqueId are required." });
  }

  try {
    const renewedTokens = await renewSession(refreshToken, req, uniqueId);

    if (!renewedTokens) {
      res.status(401).json({ message: "Invalid or expired session." });
    } else {
      res.status(200).json({
        message: "Session renewed successfully.",
        accessToken: renewedTokens.accessToken,
        refreshToken: renewedTokens.refreshToken,
      });
    }
  } catch (error: unknown) {
    console.error("Error renewing session:", error);
    res.status(500).json({
      message: "Failed to renew session.",
      error: "Internal server error.",
    });
  }
};
