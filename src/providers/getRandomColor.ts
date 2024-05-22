import { color } from "..";

const colorsList: color[] = ["red", "blue", "yellow", "green", "darkblue"];

const getRandomColor = (list?: color[]): color =>{
    const colors = list || colorsList;
    const randomNumber = Math.floor(Math.random() * colors.length);
    const color = colors[randomNumber];
    return color;

}

export default getRandomColor;