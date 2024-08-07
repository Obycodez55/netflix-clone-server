import { Response } from "express";
import prismadb from "../../lib/prismadb";
import { AuthenticatedRequest, UserInterface } from "../..";
import CustomError from "../../Utils/CustomError";

interface ProfileListRequest extends AuthenticatedRequest {
    params: {  profileId: string },
    body: { movieId: string }
}

const getFavouriteList = async (request: ProfileListRequest, response: Response) => {
    const user = request.user as UserInterface;
    const profiles = user.profiles;
    const profileId = request.params.profileId;
    const profileInstance = profiles?.find(profile => profile.id === profileId);
    if (!profileInstance) throw new CustomError("You are not authorized to view this list", 403);
    const profile = await prismadb.profile.findUnique({
        where: {
            id: profileId
        },
        include: {
            favourites: {
                orderBy: {
                    createdAt: "desc"
                },
                include: {
                    movie: true
                }
            }
        }
    });
    const list = profile?.favourites;
    response.status(200).send(list);
}

// Add to Favourites List
const addToFavorite = async (request: ProfileListRequest, response: Response) => {
    const user = request.user as UserInterface;
    const profiles = user.profiles;
    const profileId = request.params.profileId;
    const profileInstance = profiles?.find(profile => profile.id === profileId);
    if (!profileInstance) throw new CustomError("You are not authorized to view this list", 403);
    const movieId = request.body.movieId;
    const movie = await prismadb.movie.findUnique({
        where: {
            id: movieId
        }
    });
    if (!movie) throw new CustomError("Movie not found", 404);
    // Add the movie to the profile's favourites list
    const favourite = await prismadb.favourite.create({
        data: {
            movieId,
            profileId
        }
    });
    response.status(201).send(favourite);
}
// Remove from Favourites List
const removeFromFavorite = async (request: ProfileListRequest, response: Response) => {
    const user = request.user as UserInterface;
    const profiles = user.profiles;
    const profileId = request.params.profileId;
    const profileInstance = profiles?.find(profile => profile.id === profileId);
    if (!profileInstance) throw new CustomError("You are not authorized to view this list", 403);
    const movieId = request.body.movieId;
    // Remove the movie from the profile's favourites list
    await prismadb.favourite.deleteMany({
        where: {
            AND: [{movieId}, {profileId}]
        }
    })
    response.status(204).end();
}

export { getFavouriteList, addToFavorite, removeFromFavorite};