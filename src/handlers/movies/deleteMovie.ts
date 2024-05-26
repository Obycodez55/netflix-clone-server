import { Request, Response } from "express";
import prismadb from "../../lib/prismadb";

const deleteMovie = async(request: Request<{id: string}>, response: Response)=>{
    const {id} = request.params;
    await prismadb.movie.delete({
        where: {
            id
        }
    });
    response.status(204).send("Successfuly Deleted");
}

export default deleteMovie;