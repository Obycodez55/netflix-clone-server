import { Router } from "express";
// import { Request, Response } from "express-serve-static-core";

// Import Handlers
import getAllLists from "../handlers/lists/getAllLists";
import createList from "../handlers/lists/createList";
import deleteList from "../handlers/lists/deleteList";


// Import Middlewares
import asyncHandler from '../Utils/asyncHandler';
import authenticateToken from "../middlewares/authenticateToken";
// import prismadb from "../lib/prismadb";
// import Lists from "../Utils/Lists";


const router = Router();

// GET All Lists
router.get("/", authenticateToken("admin"), asyncHandler(getAllLists));

// Create from File
// router.post("/create", authenticateToken("admin"), async (req: Request, res: Response) => {

//     const lists = await prismadb.movie.createMany({
//         data: Lists
//     })
//     res.status(201).send(lists);
// })

// Create New List
router.post("/", authenticateToken("admin"), asyncHandler(createList))


// DELETE a List by Id
router.delete("/:id", authenticateToken("admin"), asyncHandler(deleteList));


export default router;