import { Request, Response } from "express";
import prismadb from "../../lib/prismadb";

const getRandomMovie = async (request: Request<{}, {}, {}, { type?: "series" | "movies" }>, response: Response) => {
    const { type } = request.query;
    const isSeries = type === "series";
    let movie;
    if (type){
        movie = await prismadb.movie.aggregateRaw({
            pipeline: [
                { $match: { isSeries: isSeries } },
                { $sample: { size: 1 } }
            ]
        });
    }else{
        movie = await prismadb.movie.aggregateRaw({
            pipeline: [
                { $sample: { size: 1 } }
            ]
        });
    }
   
    response.status(200).send(movie[0]);
}

export default getRandomMovie;