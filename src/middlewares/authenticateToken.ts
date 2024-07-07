import { verify } from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "..";
import CustomError from "../Utils/CustomError";
import getUserByEmail from "../providers/getUserByEmail";


const authenticateToken = (type?: "admin" | "user") => {
    return async (request: AuthenticatedRequest, response: Response, next: NextFunction) => {
        try {
            // Check if Authentication header was sent
            const authHeader = request.headers["authorization"];
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) throw new CustomError("Bad Request: No token provided", 400);

            // Check if the token is valid
            const data = verify(token, process.env.JWT_SECRET!);
            if (!data) throw new CustomError("Unauthorized: Invalid token", 401);

            // Find the User with the email
            const { email } = data as { email: string };
            const user = await getUserByEmail(email);
            if (!user) throw new CustomError("Not Found: User not found", 404);

            //  Additional authorization : Optional?
            if (type === "admin" && !user.isAdmin) throw new CustomError("Unauthorized: You are not allowed to make this request", 401);
            if (type === "user" && request.params.id !== user.id && !user.isAdmin) throw new CustomError("Unauthorized: You are not allowed to make this request", 401);

            // If all goes well, set the user to request.user and move on
            request.user = user;
            next();
        } catch (error) {
            // Handle the error
            next(error);
        }


    }
}


export default authenticateToken;