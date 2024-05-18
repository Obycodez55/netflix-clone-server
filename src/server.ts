import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Request, Response } from "express-serve-static-core";

// const AuthRouter:any = "./routes/auth";
import AuthRouter from "./routes/auth";
import UsersRouter from "./routes/users";
import MoviesRouter from"./routes/movies";
import ListsRouter from "./routes/lists";

const app = express();
dotenv.config();

const PORT = 4000;
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/users", UsersRouter);
app.use("/api/v1/movies", MoviesRouter);
app.use("/api/v1/lists", ListsRouter);


app.all("*", async (request: Request, response: Response) => {
    response.status(200).send(`A ${request.method} request was made to ${request.protocol}://${request.hostname + ":" + PORT + request.originalUrl}`);
})

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
});