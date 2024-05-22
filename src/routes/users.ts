import { Router } from "express";
import { Request, Response } from "express-serve-static-core";
import asyncHandler from "../Utils/asyncHandler";
import authenticateToken from "../middlewares/authenticateToken";

// Import Handler Functions
import findOne from "../handlers/users/findOne";
import createProfile from "../handlers/users/createProfile";

const router = Router();


router.get("/", (request: Request, response: Response)=>{
    response.send("Hello Users");
})

// Get a single user
router.get("/findOne", asyncHandler(authenticateToken), findOne);

// Create A new profile
router.post("/createProfile", asyncHandler(authenticateToken), asyncHandler(createProfile))
export default router;