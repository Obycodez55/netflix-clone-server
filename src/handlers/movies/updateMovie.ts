import { Request, Response } from "express";
import prismadb from "../../lib/prismadb";
import { Movie } from "@prisma/client";

const updateMovie = async (request: Request<{ id: string }, {}, Movie>, response: Response) => {
    const { id } = request.params;
    const update = request.body;
    const updatedMovie = await prismadb.movie.update({
        where: { id },
        data: update
    })
    response.status(201).send(updatedMovie);
}

export default updateMovie;