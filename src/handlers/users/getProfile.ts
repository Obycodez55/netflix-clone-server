import { Request, Response } from 'express-serve-static-core';
import prismadb from '../../lib/prismadb';
import CustomError from '../../Utils/CustomError';
import { User } from "@prisma/client";



interface ProfileRequest extends Request<{ id: string }, {}, {}> {
    user?: User;
}


const getProfile = async (request: ProfileRequest, response: Response) => {
    const { id } = request.params;
    const profile = await prismadb.profile.findUnique({
        where: {
            id
        },
        include: {
            favourites: {
                orderBy: {
                    createdAt: "desc"
                },
                include: {
                    movie: true
                }
            },
            ContinueWatching: {
                orderBy: {
                    updatedAt: "desc"
                },
                include: {
                    movie: true
                }
            },
        }
    })
    if (!profile) throw new CustomError("Profile not found", 404);

    const favouriteIds = profile.favourites.map((fav) => fav.movieId);

    response.status(200).send({...profile, favouriteIds});
}

export default getProfile;