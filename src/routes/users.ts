import { Router } from "express";
import { Request, Response } from "express-serve-static-core";
import asyncHandler from "../Utils/asyncHandler";
import authenticateToken from "../middlewares/authenticateToken";

// Import Handler Functions
import findOne from "../handlers/users/findOne";

const router = Router();

router.get("/", (request: Request, response: Response)=>{
    response.send("Hello Users");
})

router.get("/findOne", asyncHandler(authenticateToken), findOne);

export default router;