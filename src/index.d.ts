import { User } from "@prisma/client";
import { Request } from "express";

export interface RequestNew extends Request{
    user?: User;
}