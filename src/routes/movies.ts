import { Router } from "express";
import { Request, Response } from "express-serve-static-core";

// Import Handlers
import deleteMovie from "../handlers/movies/deleteMovie";
import getRandomMovie from "../handlers/movies/getRandomMovie";
import getMovieById from "../handlers/movies/getMovieById";
import getAllMovies from "../handlers/movies/getAllMovies";


// Import Middlewares
import asyncHandler from '../Utils/asyncHandler';
import authenticateToken from "../middlewares/authenticateToken";
import prismadb from "../lib/prismadb";
import Movies from "../Utils/Movies";


const router = Router();

// GET All Movies
router.get("/", authenticateToken("admin"), asyncHandler(getAllMovies));

// Create from File
router.post("/create", authenticateToken("admin"), async(req: Request, res: Response)=>{
    
    const movies = await prismadb.movie.createMany({
        data: Movies
    })
    res.status(201).send(movies);
})

// Create New Movie

// Update A Movie

// GET Random Movie
router.get("/random", authenticateToken(), asyncHandler(getRandomMovie))

// GET Movie by Id
router.get("/:id", authenticateToken(), asyncHandler(getMovieById));

// DELETE a movie by Id
router.delete("/:id", authenticateToken("admin"), asyncHandler(deleteMovie));


export default router;