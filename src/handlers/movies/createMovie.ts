import { Request, Response } from "express";
import prismadb from "../../lib/prismadb";
import { Movie } from "@prisma/client";

const createMovie = async(request: Request<{}, {}, Movie>, response: Response)=>{
    const movie = request.body;
    const newMovie = await prismadb.movie.create({ data: movie });
    response.status(201).send(newMovie);
}

export default createMovie;