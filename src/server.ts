import express from "express";

const app = express();

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
});