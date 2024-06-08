import { Request, Response } from 'express-serve-static-core';
import CustomError from "../../Utils/CustomError";
import getRandomColor from "../../providers/getRandomColor";
import { Profile, ProfilePic } from "@prisma/client";
import prismadb from "../../lib/prismadb";
import { User } from '../../../../client';

interface UserA extends User{
    profiles: Profile[]
}
interface ProfileCreateRequest extends Request<{},{},{name: string}>{
    user? : UserA;
}

const createProfile = async (request: ProfileCreateRequest, response: Response) => {
    const {profiles, id} = request.user!;
    const {name} = request.body;
    const existingProfile = profiles.filter((profile) =>{
        return profile.name.toLowerCase() === name.toLowerCase();
    });
    if(existingProfile.length !== 0 ) throw new CustomError("Name has been used, Try again!", 409);
    const getNewColor = () : ProfilePic=>{
        const color = getRandomColor();
        const existingColor = profiles.filter((profile) =>{
            return profile.profilePic === color;
        });
        if(existingColor.length !== 0 ) return getNewColor();
        return color;
    }

    await prismadb.profile.create({
        data: {
            name,
            profilePic: getNewColor(),
            userId: id
        }
    });

    response.status(201).end();
}

export default createProfile;