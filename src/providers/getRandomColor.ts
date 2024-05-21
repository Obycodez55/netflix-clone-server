type color = "red"| "blue"| "green"| "yellow";

const colors: color[] = ["red", "blue", "green", "yellow"];

const getRandomColor = (): color =>{
    const randomNumber = Math.floor(Math.random() * colors.length);
    const color = colors[randomNumber];
    return color;

}

export default getRandomColor;