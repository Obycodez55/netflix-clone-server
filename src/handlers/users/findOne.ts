import { AuthenticatedRequest } from "../..";
import { Response } from 'express-serve-static-core';

const findOne = async (request: AuthenticatedRequest, response: Response) => {
    const user = request.user!;
    const { password, ...info } = user;
    response.status(200).send(info);
}

export default findOne;