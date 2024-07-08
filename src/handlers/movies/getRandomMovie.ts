import { Request, Response } from "express";
import prismadb from "../../lib/prismadb";

const getRandomMovie = async (request: Request<{}, {}, {}, { type?: "series" | "movies" }>, response: Response) => {
    const { type } = request.query;
    const isSeries = type === "series";
    let movie;
    const movieCount = await prismadb.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);
    if (type) {
        movie = await prismadb.movie.findMany({
            where: {
                isSeries
            },
            take: 1,
            skip: randomIndex
        })
    } else {
        movie = await prismadb.movie.findMany({
            take: 1,
            skip: randomIndex
        })
    }
    response.status(200).send(movie[0]);
}

export default getRandomMovie;