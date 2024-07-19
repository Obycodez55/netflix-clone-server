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
    const profile = await prismadb.profile.update({
        where: {
            id: profileId
        },
        data: {
            favouriteIds: {
                push: movieId
            },
            favourites: {
                connect: {
                    id: movieId
                }
            }
        },
        include: {
            favourites: {
                orderBy: {
                    createdAt: "desc"
                }
            }
        }
    });
    response.status(201).send(profile.favourites);
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
    const profile = await prismadb.profile.update({
        where: {
            id: profileId
        },
        data: {
            favouriteIds: {
                set: profileInstance.favouriteIds.filter(favId => favId !== movieId)
            },
            favourites: {
                disconnect: {
                    id: movieId
                }
            }
        },
        include: {
            favourites: {
                orderBy: {
                    createdAt: "desc"
                }
            }
        }
    });
    response.status(200).send(profile.favourites);
}

export { getFavouriteList, addToFavorite, removeFromFavorite};