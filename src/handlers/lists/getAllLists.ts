import { Request, Response } from "express";
import prismadb from "../../lib/prismadb";


const getAllLists = async (request: Request, response: Response) => {
    const movies = await prismadb.list.findMany();

    response.status(200).send(movies);
}

export default getAllLists;