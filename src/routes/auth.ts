import { Router } from "express";
import { Response } from "express-serve-static-core";

// Import Handlers
import register from "../handlers/auth/register";
import login from "../handlers/auth/login";

// Import Middlewares
import asyncHandler from '../Utils/asyncHandler';
import authenticateToken from "../middlewares/authenticateToken";
import { RequestNew } from "..";

const router = Router();

router.get("/", asyncHandler(authenticateToken), (request: RequestNew, response: Response) => {
    response.send(request.user);
})

router.post("/register", asyncHandler(register));

router.post("/login", asyncHandler(login));

export default router;