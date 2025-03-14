import { pieceMap } from "./board.js";
let currentTurn = "w"; // Weiß beginnt
// Drag & Drop Events
const addDragEvents = (img) => {
    img.addEventListener("dragstart", (e) => {
        const piece = pieceMap.get(img.id);
        // Überprüfen, ob die richtige Farbe am Zug ist
        if ((piece === null || piece === void 0 ? void 0 : piece.color) !== currentTurn) {
            e.preventDefault();
            return;
        }
        img.classList.add("dragging");
        setTimeout(() => img.classList.add("hide"), 0); // Hiding the image on drag
    });
    img.addEventListener("dragend", () => {
        img.classList.remove("dragging");
        img.classList.remove("hide");
    });
};
const addDropEvents = (square) => {
    // Enable dragover
    square.addEventListener("dragover", (e) => {
        e.preventDefault();
    });
    // Drop-Event
    square.addEventListener("drop", (e) => {
        e.preventDefault();
        //Taking hold of the image and the piece moving
        const draggedPiece = document.querySelector(".dragging");
        const movingPiece = pieceMap.get(draggedPiece.id);
        //Finding the new row and col to move the piece
        const newRow = parseInt(square.dataset.row);
        const newCol = parseInt(square.dataset.col);
        //Checking if the move is valid
        if ((movingPiece === null || movingPiece === void 0 ? void 0 : movingPiece.isValidMove(newRow, newCol)) && movingPiece.isPathFree(newRow, newCol)) {
            movingPiece === null || movingPiece === void 0 ? void 0 : movingPiece.move(newRow, newCol, square);
            // Wechseln des Spielzugs
            currentTurn = currentTurn === "w" ? "b" : "w";
        }
    });
    let dynamicValue = Math.random();
};
export { addDragEvents, addDropEvents, currentTurn };
setInterval(() => {
    currentTurn = currentTurn;
}, 10);
export function getCurrentTurn() {
    return currentTurn;
}
