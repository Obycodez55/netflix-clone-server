import { verify } from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { RequestNew } from "..";
import CustomError from "../Utils/CustomError";
import { JWTData } from "../dtos/UserDto";
import getUserByEmail from "../providers/getUserByEmail";

const secret = process.env.JWT_SECRET as string;
const authenticateToken = async (request: RequestNew, response: Response, next: NextFunction) => {
    const authHeader = request.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) throw new CustomError("Bad Request: No token provided", 400);
    const data = verify(token, secret);
    if (!data) throw new CustomError("Unauthorized: Invalid token", 401);
    const { email } = data as JWTData;
    const user = await getUserByEmail(email);
    if (!user) throw new CustomError("Not Found: User not found", 404);
    request.user = user;
    next();

}

export default authenticateToken;