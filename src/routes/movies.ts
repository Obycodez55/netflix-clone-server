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
import { getContinueWatching, removeFromContinueWatching, updateContinueWatching } from "../handlers/movies/continueWatching";
import getLists from "../handlers/movies/lists";
import search from "../handlers/movies/search";

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

// GET Search 
router.get("/search", authenticateToken(), asyncHandler(search));
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

// Get Continue Watching
router.get("/continue/:profileId", authenticateToken(), asyncHandler(getContinueWatching));

// Update Continue Watching
router.put("/continue/:profileId", authenticateToken(), asyncHandler(updateContinueWatching));

// Remove movie from Continue Watching
router.delete("/continue/:profileId", authenticateToken(), asyncHandler(removeFromContinueWatching));

// Get List of Movies
router.get("/lists/all", authenticateToken(), asyncHandler(getLists));



export default router;