import { Genre } from "@prisma/client";
import prismadb from "../lib/prismadb";

// Most Recently Added
export const getMostRecentlyAdded = async (isSeries?: boolean) => {
    const recentlyAddedMovies = await prismadb.movie.findMany({
        take: 20,
        where: {
            isSeries
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    return recentlyAddedMovies;
}

// Most Watched
export const getMostWatched = async (isSeries?: boolean) => {
    const mostWatchedMovies = await prismadb.watch.groupBy({
        by: ["movieId"],
        _count: {
            movieId: true
        },
        orderBy: {
            _count: {
                movieId: "desc"
            }
        },
        where: {
            movie: {
                isSeries
            }
        },
        take: 20
    });
    return mostWatchedMovies;
}

//  Most Loved
export const getMostLoved = async (isSeries?: boolean) => {
    const mostFavoriteIds = await prismadb.profile.aggregateRaw({
        pipeline: [
            { $unwind: '$favoriteIds' },
            { $group: { _id: '$favoriteIds', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 20 }
        ]
    });
    if (!mostFavoriteIds) return [];
    const mostLovedIds = (mostFavoriteIds as unknown as { _id: string; count: number }[]).map((fav) => fav._id);
    const mostLovedMovies = await prismadb.movie.findMany({
        where: {
            id: {
                in: mostLovedIds
            },
            isSeries
        }
    });
    return mostLovedMovies;
}

// By Genre
export const getMoviesByGenre = async (genre: Genre | Genre[]) => {
    const movies = await prismadb.movie.findMany({
        where: {
            genre: Array.isArray(genre) ? {
                hasSome: genre
            } : {
                has: genre
            }
        },
        take: 20
    });
    return movies;
}