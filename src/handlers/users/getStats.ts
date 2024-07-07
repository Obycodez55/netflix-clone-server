import { Response } from "express-serve-static-core";
import { AuthenticatedRequest } from "../..";
import CustomError from "../../Utils/CustomError";
import prismadb from "../../lib/prismadb";

const getStats = async (request: AuthenticatedRequest, response: Response) => {
    const stats = await prismadb.user.aggregateRaw({
        pipeline: [
            {
                $group: {
                    _id: { $month: '$createdAt' },
                    total: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id",
                    total: 1
                }
            },
            {
                $sort: { month: 1 }
            }
        ]
    });
    response.status(200).send(stats);
}

export default getStats;