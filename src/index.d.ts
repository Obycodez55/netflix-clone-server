import { Prisma } from "@prisma/client";
import { Request } from "express";

export interface RequestNew extends Request{
    user?: Prisma.UserCreateInput;
}