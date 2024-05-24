import { Response } from "express-serve-static-core";
import { RequestNew } from "../..";
import CustomError from "../../Utils/CustomError";
import prismadb from "../../lib/prismadb";

const getStats = async (request: RequestNew, response: Response) => {
    const { isAdmin } = request.user!;
    if (!isAdmin) throw new CustomError("Unauthorized: You are not allowed to make this request", 401);
    const monthsArray = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]
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