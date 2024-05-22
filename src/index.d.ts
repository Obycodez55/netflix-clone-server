import { Prisma } from "@prisma/client";
import { Request } from "express";

export type color = "red"| "blue"| "yellow" | "green" | "darkblue";
export interface Profile {
    id: string
    name: string
    profilePic: "red" | "blue" | "yellow" | "green" | "darkblue"| "kids";
    createdAt?: Date | string
    updatedAt?: Date | string
    favouriteIds?: string[]
}
export interface User {
    id?: string
    username: string
    email: string
    password: string
    emailVerified?: boolean
    emailVerifiedDate?: Date | string | null
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    profiles: Profile[],
    sessions?: any
    accounts?: any
}
export interface RequestNew extends Request{
    user?: User;
}