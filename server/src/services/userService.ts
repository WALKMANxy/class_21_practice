import { IUser, User } from "../models/User";

export class UserService {
  static async getAllUsers(): Promise<IUser[]> {
    try {
      return await User.find().select("-password").exec();
    } catch (err) {
      throw new Error(
        `Error retrieving users: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    }
  }

  static async getUserById(id: string): Promise<IUser | null> {
    try {
      return await User.findById(id).select("-password").exec();
    } catch (err) {
      throw new Error(
        `Error retrieving user by ID: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    }
  }
}
