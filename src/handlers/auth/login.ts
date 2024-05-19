import { compare } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { UserDto } from "../../dtos/UserDto";
import CustomError from "../../Utils/CustomError";
import getUserByEmail from "../../providers/getUserByEmail";
import getAccessToken from "../../providers/getAccessToken";


const login = async (request: Request<{}, {}, UserDto>, response: Response, next: NextFunction) => {
    const user = await getUserByEmail(request.body.email);
    if (!user) throw new CustomError('Invalid login details, Try again!', 403);
    const passwordMatch = await compare(request.body.password, user.password);
    if (!passwordMatch) throw new CustomError('Invalid login details, Try again!', 403);
    const { email, isAdmin, emailVerified } = user;
    const accessToken = getAccessToken({ email, isAdmin, emailVerified });

    const { password, ...info } = user
    response.status(200).send({ ...info, accessToken });
}

export default login;