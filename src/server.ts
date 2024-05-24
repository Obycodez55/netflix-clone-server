import express, { NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Request, Response } from "express-serve-static-core";

// Import Routers
import AuthRouter from "./routes/auth";
import UsersRouter from "./routes/users";
import MoviesRouter from"./routes/movies";
import ListsRouter from "./routes/lists";

// Import Error Handling middleware
import errorHandler from "./middlewares/errorHandler";
import CustomError from "./Utils/CustomError";

const app = express();
const PORT = 8080;
dotenv.config();

// Use middlewares
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/users", UsersRouter);
app.use("/api/v1/movies", MoviesRouter);
app.use("/api/v1/lists", ListsRouter);

// Handle other requests
app.all("*", async (request: Request, response: Response, next: NextFunction) => {
    const error = new CustomError(`No ${request.method} request is allowed to ${request.protocol}://${request.hostname + ":" + PORT + request.originalUrl}`, 404);
    next(error);
})
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
});