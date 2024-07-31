import { Response } from "express-serve-static-core";
import { AuthenticatedRequest, UserInterface } from "../..";
import prismadb from "../../lib/prismadb";
import CustomError from "../../Utils/CustomError";

interface ContinueWatchingRequest extends AuthenticatedRequest {
    params: { profileId: string },
    body: {
        movieId: string,
        timestamp: number
    }
}

const getContinueWatching = async (request: ContinueWatchingRequest, response: Response) => {
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
            ContinueWatching: {
                orderBy: {
                    updatedAt: "desc"
                }
            }
        }
    });
    const list = profile?.ContinueWatching;
    response.status(200).send(list);
}

const updateContinueWatching = async (request: ContinueWatchingRequest, response: Response) => {
    const user = request.user as UserInterface;
    const profiles = user.profiles;
    const profileId = request.params.profileId;
    const profileInstance = profiles?.find(profile => profile.id === profileId);
    if (!profileInstance) throw new CustomError("You are not authorized to view this list", 403);
    const { movieId, timestamp } = request.body;
    const continueWatchingInstance = await prismadb.continueWatching.findFirst({
        where: {
            profileId,
            movieId
        }
    });
    if (continueWatchingInstance) {
        await prismadb.continueWatching.update({
            where: {
                id: continueWatchingInstance.id
            },
            data: {
                timestamp
            }
        });
    } else {
        await prismadb.continueWatching.create({
            data: {
                profileId,
                timestamp,
                movieId
            }
        });
        await prismadb.watch.create({
            data: {
                profileId,
                movieId
            }
        })
    }
    const profile = await prismadb.profile.findUnique({
        where: {
            id: profileId
        },
        include: {
            ContinueWatching: {
                orderBy: {
                    updatedAt: "desc"
                }
            }
        }
    });
    const list = profile?.ContinueWatching;
    response.status(200).send(list);
};

const removeFromContinueWatching = async (request: ContinueWatchingRequest, response: Response) => {
    const user = request.user as UserInterface;
    const profiles = user.profiles;
    const profileId = request.params.profileId;
    const profileInstance = profiles?.find(profile => profile.id === profileId);
    if (!profileInstance) throw new CustomError("You are not authorized to view this list", 403);
    const { movieId } = request.body;
    const continueWatchingInstance = await prismadb.continueWatching.findFirst({
        where: {
            profileId,
            movieId
        }
    });
    if (continueWatchingInstance) {
        await prismadb.continueWatching.delete({
            where: {
                id: continueWatchingInstance.id
            }
        });
    }
    const profile = await prismadb.profile.findUnique({
        where: {
            id: profileId
        },
        include: {
            ContinueWatching: {
                orderBy: {
                    updatedAt: "desc"
                }
            }
        }
    });
    const list = profile?.ContinueWatching;
    response.status(200).send(list);
}

export { getContinueWatching, updateContinueWatching, removeFromContinueWatching };