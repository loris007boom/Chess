import { pieceMap } from "./board.js";
// Drag & Drop Events
const addDragEvents = (img) => {
    img.addEventListener("dragstart", (e) => {
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
        }
    });
};
export { addDragEvents, addDropEvents };
