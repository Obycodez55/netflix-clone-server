import { Request, Response } from "express";
import prismadb from "../../lib/prismadb";
import { AuthenticatedRequest, UserInterface } from "../..";
import CustomError from "../../Utils/CustomError";

interface GetMovieByIdRequest extends AuthenticatedRequest {
    params: { id: string },
    body: { profileId: string }
}

const getMovieById = async (request: GetMovieByIdRequest, response: Response) => {
    const { id } = request.params;
    const { profileId } = request.body;
    const continueWatching = await prismadb.continueWatching.findFirst({
        where: {
            profileId,
            movieId: id
        },
        include: {
            movie: true
        }
    });
    if (continueWatching) {
        response.status(200).send({...continueWatching.movie, timestamp: continueWatching.timestamp});
        return
    }
    const movie = await prismadb.movie.findUnique({
        where: {
            id
        }
    });
    response.status(200).send(movie);
}

export default getMovieById;