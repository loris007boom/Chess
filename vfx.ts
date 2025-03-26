import { King } from "./pieces.js";

let vCheck_On = (king: King) => {
    const image = king.img;
    const square = image.parentElement;
    square?.classList.add("checkSquare");
}

let vCheck_Off = (king: King) => {
    const image = king.img;
    const square = image.parentElement;
    square?.classList.remove("checkSquare");
}

export {vCheck_Off, vCheck_On };
