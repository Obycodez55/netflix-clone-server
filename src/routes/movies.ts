import { Router } from "express";
import { Request, Response } from "express-serve-static-core";

const router = Router();

router.get("/", (request: Request, response: Response)=>{
    response.send("Hello Movies");
})


export default router;