type color = "red"| "blue"| "yellow" | "green" | "darkblue";

const colors: color[] = ["red", "blue", "yellow", "green", "darkblue"];

const getRandomColor = (): color =>{
    const randomNumber = Math.floor(Math.random() * colors.length);
    const color = colors[randomNumber];
    return color;

}

export default getRandomColor;