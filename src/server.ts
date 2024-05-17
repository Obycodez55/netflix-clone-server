import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

const PORT = 8000;
app.use(cors());
app.all("*", (request: Request, response: Response) => {
    response.status(200).send(`A ${request.method} request was made to ${request.protocol}://${request.hostname + ":" + PORT + request.originalUrl}`);
})

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
});