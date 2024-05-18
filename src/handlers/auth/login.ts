import { Request, Response } from "express";
import { UserDto } from "../../dtos/UserDto";


const login = async(request: Request<{}, {}, UserDto>, response: Response)=>{
    response.send("Welcome to login");
}

export default login;