import { Response } from "express";
import { AuthenticatedRequest } from "../..";
import prismadb from "../../lib/prismadb";
import { Genre } from "@prisma/client";
import { getMostLoved, getMostRecentlyAdded, getMostWatched } from "../../providers/listOperations";
import CustomError from "../../Utils/CustomError";

const genres = ['Thriller', 'Action', 'Drama', 'Tragedy', 'Comedy', 'SciFi', 'History', 'Horror', 'Crime', 'Romance', 'Adventure', 'Fantasy', 'Animation', 'Period_piece', 'Biography'];

interface SearchRequest extends AuthenticatedRequest {
    query: { text: string }
    body: { profileId: string }
}

const search = async (request: SearchRequest, response: Response) => {
    const { text } = request.query;
    if (!text) throw new CustomError("Please provide a search text", 400);
    let movies;
    if (text == "%%") {
        movies = await getMostWatched(undefined, true);
    } else {
        const textArray = text.split(" ");
    const genreArray = genres.filter((genre) => textArray.includes(genre.toLowerCase()) || textArray.includes(genre));
    const profile= await prismadb.profile.findUnique({
        where: {
            id: request.body.profileId
        },
        include: {
            favourites: true,
            ContinueWatching: true
        }
    });
    const mostLovedIds = (await getMostLoved()).map(item => item.id);
    const mostWatchedIds = (await getMostWatched()).map(item => item.id);
    const recentIds = (await getMostRecentlyAdded()).map(item => item.id);
    const favouriteIds = profile?.favourites.map((fav) => fav.movieId);
    const continueWatchingIds = profile?.ContinueWatching.map((item) => item.movieId);

  

    movies = await prismadb.movie.findMany({
        where: {
            OR: [
                {
                    title: {
                        contains: text,
                        mode: "insensitive"
                    }
                },
                {
                    description: {
                        contains: text,
                        mode: "insensitive"
                    }
                },
                {
                    genre: {
                        hasSome: <Genre[]>genreArray,
                    }
                }
            ]
        },
    });
    movies.sort((a, b) => {
        // Sort by the Existence in the Favourites list
        if (favouriteIds?.includes(a.id) && !favouriteIds?.includes(b.id)) return -1;
        if (!favouriteIds?.includes(a.id) && favouriteIds?.includes(b.id)) return 1;

        // Sort by the existence in the continue Watching list
        if (continueWatchingIds?.includes(a.id) && !continueWatchingIds?.includes(b.id)) return -1;
        if (!continueWatchingIds?.includes(a.id) && continueWatchingIds?.includes(b.id)) return 1;

        // Sort By existence in the most loved list
        if (mostLovedIds?.includes(a.id) && !mostLovedIds?.includes(b.id)) return -1;
        if (!mostLovedIds?.includes(a.id) && mostLovedIds?.includes(b.id)) return 1;

        // Sort By existence in the most watched list
        if (mostWatchedIds?.includes(a.id) && !mostWatchedIds?.includes(b.id)) return -1;
        if (!mostWatchedIds?.includes(a.id) && mostWatchedIds?.includes(b.id)) return 1;

        // Sort by existence in the recently added list
        if (recentIds?.includes(a.id) && !recentIds?.includes(b.id)) return -1;
        if (!recentIds?.includes(a.id) && recentIds?.includes(b.id)) return 1;

        // Leave the custom sorting from Prisma
        return 0;
    });
    }
    
    response.status(200).send(movies);
}

export default search;