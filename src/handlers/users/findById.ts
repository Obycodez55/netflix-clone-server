import { Request, Response } from "express-serve-static-core";
import prismadb from "../../lib/prismadb";
import { AuthenticatedRequest } from "../..";
import CustomError from "../../Utils/CustomError";


const findById = async (request: AuthenticatedRequest, response: Response) => {
    const { id } = request.params;
    const user = await prismadb.user.findUnique({
        where: {
            id
        },
        include: {
            profiles: true
        }
    });

    if (!user) throw new CustomError("Not Found: User not found", 404);
    const { password, ...info } = user
    response.status(200).send(info)
}

export default findById;