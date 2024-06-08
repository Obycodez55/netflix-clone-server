import {Request, Response } from 'express-serve-static-core';
import prismadb from '../../lib/prismadb';
import CustomError from '../../Utils/CustomError';
import { User } from "@prisma/client";


interface ParamId{
    id: string;
}
interface ProfileRequest extends Request<ParamId, {}, {}> {
    user?: User;
}


const getProfile = async (request: ProfileRequest, response: Response) => {
    const { id } = request.params;
    const profile = await prismadb.profile.findUnique({
        where: {
            id
        }
    })
    if(!profile) throw new CustomError("Profile not found", 404)
    response.status(200).send(profile);
}

export default getProfile;