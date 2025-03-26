let vCheck_On = (king) => {
    const image = king.img;
    const square = image.parentElement;
    square === null || square === void 0 ? void 0 : square.classList.add("checkSquare");
};
let vCheck_Off = (king) => {
    const image = king.img;
    const square = image.parentElement;
    square === null || square === void 0 ? void 0 : square.classList.remove("checkSquare");
};
export { vCheck_Off, vCheck_On };
