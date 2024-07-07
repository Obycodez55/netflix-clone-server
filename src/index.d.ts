import { User } from "@prisma/client";
import { Request } from "express";

interface UserInterface extends User {
    profiles: string[];
}
export interface AuthenticatedRequest extends Request {
    user?: User;
}