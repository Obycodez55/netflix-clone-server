import { Request, Response } from "express";
import prismadb from "../../lib/prismadb";

const getMovieById = async(request: Request<{id: string}>, response: Response)=>{
    const {id} = request.params;
    const movie = await prismadb.movie.findUnique({
        where: {
            id
        }
    });
    response.status(200).send(movie);
}

export default getMovieById;