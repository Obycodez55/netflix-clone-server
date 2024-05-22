import { Prisma } from "@prisma/client";
import { RequestNew } from "../..";
import { Response } from 'express-serve-static-core';

const findOne = async (request: RequestNew, response: Response) => {
    const user = request.user!;
    const { password, ...info } = user;
    response.status(200).send(info);
}

export default findOne;