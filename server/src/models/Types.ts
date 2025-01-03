import { IUser } from "./User";
import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user?: Partial<IUser>;
}
