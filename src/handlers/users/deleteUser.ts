import { Response } from "express-serve-static-core";
import CustomError from "../../Utils/CustomError";
import prismadb from "../../lib/prismadb";
import { RequestNew } from "../..";


const deleteUser = async (request: RequestNew, response: Response) => {

    const { id: userId, isAdmin } = request.user!;
    const { id } = request.params;
    if (id !== userId && !isAdmin) throw new CustomError("Unauthorized: You are not allowed to make this request", 401);

    await prismadb.profile.deleteMany({
        where: {
            userId:id
        }
    })

    await prismadb.user.delete({
        where: {
            id
        }
    })
    response.status(202).send("Successfully deleted");
}

export default deleteUser;