import { Request, Response } from "express";
import prismadb from "../../lib/prismadb";


const getAllMovies = async (request: Request, response: Response) => {
    const movies = await prismadb.movie.findMany();

    response.status(200).send(movies);
}

export default getAllMovies;