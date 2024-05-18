import { Router } from "express";
import { Request, Response } from "express-serve-static-core";

import register from "../handlers/auth/register";
import login from "../handlers/auth/login";

const router = Router();

router.get("/", (request: Request, response: Response)=>{
    response.send("Hello Auth");
})

router.post("/register", register);

router.post("/login", login)

export default router;