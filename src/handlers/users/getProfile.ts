import {Request, Response } from 'express-serve-static-core';
import prismadb from '../../lib/prismadb';
import CustomError from '../../Utils/CustomError';

interface ParamId{
    id: string;
}

const getProfile = async (request: Request<ParamId>, response: Response) => {
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