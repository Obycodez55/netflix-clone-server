import { Response } from "express-serve-static-core";
import CustomError from "../../Utils/CustomError";
import prismadb from "../../lib/prismadb";
import { RequestNew } from "../..";


const deleteUser = async (request: RequestNew, response: Response) => {

    const { id } = request.params;

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