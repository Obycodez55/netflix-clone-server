import { User } from "@prisma/client";
import { Request, Response } from "express";
import prismadb from "../../lib/prismadb";
import CustomError from "../../Utils/CustomError";

interface UsersRequest extends Request<{}, {}, {}, { newUsers?: boolean }> {
    user?: User
}

const findAll = async (request: UsersRequest, response: Response) => {
    const { newUsers } = request.query;
    const users = newUsers ? await prismadb.user.findMany({
        orderBy: {
            createdAt: "asc"
        },
        take: 10,
        include: {
            profiles: true
        }
    }) : await prismadb.user.findMany({
        include: {
            profiles: true
        }
    })

    response.status(200).send(users);
}

// prismadb.user.aggregate([
//     {
//         $pro
//     }
// ])
export default findAll;