import { Request, Response } from "express";
import { UserDto } from "../../dtos/UserDto";


const register = async(request: Request<{}, {}, UserDto>, response: Response)=>{
    response.send("Welcome to register");
}

export default register;