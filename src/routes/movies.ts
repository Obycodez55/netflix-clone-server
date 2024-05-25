import { Router } from "express";
import { Request, Response } from "express-serve-static-core";

// Import Handlers

// Import Middlewares
import asyncHandler from '../Utils/asyncHandler';
import authenticateToken from "../middlewares/authenticateToken";

const router = Router();

router.get("/", (request: Request, response: Response)=>{
    response.send("Hello Movies");
})


export default router;