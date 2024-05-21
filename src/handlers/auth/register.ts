import { hash } from "bcrypt";
import { Request, Response } from "express";
import { UserDto } from "../../dtos/UserDto";
import prismadb from "../../lib/prismadb";
import getUserByEmail from "../../providers/getUserByEmail";
import CustomError from "../../Utils/CustomError";
import getAccessToken from "../../providers/getAccessToken";
import getRandomColor from "../../providers/getRandomColor";

const salt = process.env.SALT;
const register = async (request: Request<{}, {}, UserDto>, response: Response) => {
    const { email, username } = request.body;
    const existingUser = await getUserByEmail(email);
    if (existingUser) throw new CustomError('User already exists', 409);
    const hashedPassword = await hash(request.body.password, Number(salt));
    const color = getRandomColor();
    const newUser = await prismadb.user.create({
        data: {
            email,
            username,
            password: hashedPassword,
            profiles: {
                createMany: {
                    data: [
                        {
                            name: username,
                            profilePic: color  
                        },
                        {
                            name: "Kids",
                            profilePic: "kids"
                        }
                    ]
                }
                // create: {
                //     
                // },
                
            }
        },
        include: {
            profiles: true
        }
    });
    const accessToken = getAccessToken({email});
    response.status(201).send({accessToken});


}

export default register;