import { verify } from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { RequestNew } from "..";
import CustomError from "../Utils/CustomError";
import getUserByEmail from "../providers/getUserByEmail";

const authenticateToken = async (request: RequestNew, response: Response, next: NextFunction) => {
    try {
        const authHeader = request.headers["authorization"];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) throw new CustomError("Bad Request: No token provided", 400);
        const data = verify(token, process.env.JWT_SECRET!);
        if (!data) throw new CustomError("Unauthorized: Invalid token", 401);
        const { email } = data as {email: string};
        const user = await getUserByEmail(email);
        if (!user) throw new CustomError("Not Found: User not found", 404);
        request.user = user;
        next();
    } catch (error) {
        next(error);
    }
   

}

export default authenticateToken;