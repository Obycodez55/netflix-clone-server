import { Request, Response } from "express";
import prismadb from "../../lib/prismadb";
import { List } from "@prisma/client";

const createList = async(request: Request<{}, {}, List>, response: Response)=>{
    const list = request.body;
    const newList = await prismadb.list.create({ data: list });
    response.status(201).send(newList);
}

export default createList;