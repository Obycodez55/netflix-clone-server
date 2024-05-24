import { RequestNew } from "../..";
import { Response } from 'express-serve-static-core';
import CustomError from "../../Utils/CustomError";
import getRandomColor from "../../providers/getRandomColor";
import { Profile, ProfilePic } from "@prisma/client";
import prismadb from "../../lib/prismadb";

const createProfile = async (request: RequestNew, response: Response) => {
    const {profiles, id} = request.user!;
    const {name} = request.body;
    const existingProfile = profiles.filter((profile: Profile) =>{
        return profile.name.toLowerCase() === name.toLowerCase();
    });
    if(existingProfile.length !== 0 ) throw new CustomError("Name has been used, Try again!", 409);
    const getNewColor = () : ProfilePic=>{
        const color = getRandomColor();
        const existingColor = profiles.filter((profile: Profile) =>{
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