import { Request, Response } from "express";
import { UserService } from "../services/userService";

export class UserController {
    static async getAllUsers(_req: Request, res: Response): Promise<void> {
        try {
          const users = await UserService.getAllUsers();
          res.json(users);
        } catch (err) {
          if (err instanceof Error) {
            res.status(500).json({ message: err.message });
          } else {
            res.status(500).json({ message: "Internal Server Error" });
          }
        }
      }
    
      static async getUserById(req: Request, res: Response): Promise<void> {
        try {
          const user = await UserService.getUserById(req.params.id);
          if (!user) {
            res.status(200).json({ message: "User not found" });
            return;
          }
          res.json(user);
        } catch (err) {
          if (err instanceof Error) {
            res.status(500).json({ message: err.message });
          } else {
            res.status(500).json({ message: "Internal Server Error" });
          }
        }
      }
    }