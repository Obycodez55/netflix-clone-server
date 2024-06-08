import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import CustomError from "../Utils/CustomError";


const errorHandler: ErrorRequestHandler = (error: CustomError, request: Request, response: Response, next: NextFunction)=>{
    // console.log(error)
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "errorr";
    return response.status(error.statusCode).send({
        statusCode: error.statusCode,
        message: error.message,
        status: error.status
    })
}

export default errorHandler;