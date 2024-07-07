import { Router } from "express";
import { Request, Response } from "express-serve-static-core";

// Import Handlers
import deleteMovie from "../handlers/movies/deleteMovie";
import getRandomMovie from "../handlers/movies/getRandomMovie";
import getMovieById from "../handlers/movies/getMovieById";
import getAllMovies from "../handlers/movies/getAllMovies";
import createMovie from "../handlers/movies/createMovie";


// Import Middlewares
import asyncHandler from '../Utils/asyncHandler';
import authenticateToken from "../middlewares/authenticateToken";
import prismadb from "../lib/prismadb";
import Movies from "../Utils/Movies";
import updateMovie from "../handlers/movies/updateMovie";
import { addToFavorite, getFavouriteList, removeFromFavorite } from "../handlers/movies/profileLists";


const router = Router();

// GET All Movies
router.get("/", authenticateToken(), asyncHandler(getAllMovies));

// Create from File
router.post("/create", authenticateToken("admin"), async (req: Request, res: Response) => {

    const movies = await prismadb.movie.createMany({
        data: Movies
    })
    res.status(201).send(movies);
})

// Create New Movie
router.post("/", authenticateToken("admin"), asyncHandler(createMovie))

// Update A Movie
router.put("/:id", authenticateToken("admin"), asyncHandler(updateMovie))

// GET Random Movie
router.get("/random", authenticateToken(), asyncHandler(getRandomMovie))

// GET My list
router.get("/mylist/:profileId", authenticateToken(), asyncHandler(getFavouriteList));

// Add to Favourites List
router.post("/mylist/:profileId", authenticateToken(), asyncHandler(addToFavorite));

// Remove from Favourites List
router.delete("/mylist/:profileId", authenticateToken(), asyncHandler(removeFromFavorite));

// GET Movie by Id
router.get("/:id", authenticateToken(), asyncHandler(getMovieById));

// DELETE a movie by Id
router.delete("/:id", authenticateToken("admin"), asyncHandler(deleteMovie));


export default router;