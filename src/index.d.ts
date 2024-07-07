import { Profile, User } from "@prisma/client";
import { Request } from "express";

interface UserInterface extends User {
    profiles: Profile[];
}
export interface AuthenticatedRequest extends Request {
    user?: User;
}