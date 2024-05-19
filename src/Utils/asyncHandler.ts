import { NextFunction, Request, Response } from "express"

const asyncHandler = (action: Function)=>{
    return async(request: Request, response: Response, next: NextFunction)=>{
        try {
            await action(request, response, next)
        } catch (error) {
            next(error);
        }
        
    }
}

export default asyncHandler;