import { Request, Response } from "express-serve-static-core";
import prismadb from "../../lib/prismadb";
import { RequestNew } from "../..";
import CustomError from "../../Utils/CustomError";


const findById = async(request: RequestNew, response : Response)=>{
    const { id: userId, isAdmin } = request.user!;
    const { id } = request.params;
    if (id !== userId && !isAdmin) throw new CustomError("Unauthorized: You are not allowed to make this request", 401);
    const user = await prismadb.user.findUnique({
        where: {
            id
        },
        include:{
            profiles: true
        }
    });
    
    if (!user) throw new CustomError("Not Found: User not found", 404);
    const {password, ...info} = user
    response.status(200).send(info)
}

export default findById;