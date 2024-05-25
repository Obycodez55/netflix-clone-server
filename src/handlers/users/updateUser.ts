import { Response } from "express-serve-static-core";
import { Request } from "express";
import CustomError from "../../Utils/CustomError";
import prismadb from "../../lib/prismadb";
import { User } from '@prisma/client';


interface UpdateRequest extends Request<{ id: string }, {}, User> {
    user?: User;
}

interface UpdateData {
    username?: string,
    email?: string,
    password?: string,
    emailVerified?: boolean,
    emailVerifiedDate?: Date
}

const updateUser = async (request: UpdateRequest, response: Response) => {
    const { id } = request.params;

    const { username, email } = request.body;
    const update: UpdateData = { username, email };
    if (email) {
        update.emailVerified = false;
        update.emailVerifiedDate = undefined;
    }
    const data = await prismadb.user.update({
        data: update,
        where: {
            id
        }
    })
    const { password, ...info } = data;
    response.status(200).send(info);
}

export default updateUser;