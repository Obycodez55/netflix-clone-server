import { ProfilePic } from "@prisma/client";

const colorsList: ProfilePic[] = ["red", "blue", "yellow", "green", "darkblue"];

const getRandomColor = (list?: ProfilePic[]): ProfilePic =>{
    const colors = list || colorsList;
    const randomNumber = Math.floor(Math.random() * colors.length);
    const color = colors[randomNumber];
    return color;

}

export default getRandomColor;