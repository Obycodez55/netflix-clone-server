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
export const getMostWatched = async (isSeries?: boolean, limit?:boolean) => {
    const take = limit ? 20 : undefined;
    const mostWatchedResult = await prismadb.watch.groupBy({
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
        take
    });
    const mostWatchedIds = mostWatchedResult.map((watch) => watch.movieId);
    const mostWatched = await prismadb.movie.findMany({
        where: {
            id: {
                in: mostWatchedIds
            }
        }
    });
    return mostWatched;
}

//  Most Loved
export const getMostLoved = async (isSeries?: boolean) => {
    const mostLovedResult = await prismadb.favourite.groupBy({
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
    const mostLovedIds = mostLovedResult.map((favourite) => favourite.movieId);
    const mostLoved = await prismadb.movie.findMany({
        where: {
            id: {
                in: mostLovedIds
            }
        }
    });
    return mostLoved;
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