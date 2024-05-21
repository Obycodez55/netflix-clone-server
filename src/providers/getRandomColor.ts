type color = "red"| "blue"| "green"| "yellow";

const colors: color[] = ["red", "blue", "green", "yellow"];

const getRandomColor = (): color =>{
    return colors[Math.floor(Math.random() * colors.length)];
}

export default getRandomColor;