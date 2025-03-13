import { pieceMap } from "./board.js";

let currentTurn = "w"; // Weiß beginnt

// Drag & Drop Events
const addDragEvents = (img: HTMLImageElement) => {
  img.addEventListener("dragstart", (e: DragEvent) => {
    const piece = pieceMap.get(img.id);

    // Überprüfen, ob die richtige Farbe am Zug ist
    if (piece?.color !== currentTurn) {
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
}

const addDropEvents = (square: HTMLElement) => {
  // Enable dragover
  square.addEventListener("dragover", (e: DragEvent) => {
    e.preventDefault();
  });

  // Drop-Event
  square.addEventListener("drop", (e: DragEvent) => {
    e.preventDefault();
    //Taking hold of the image and the piece moving
    const draggedPiece = document.querySelector(".dragging") as HTMLElement;
    const movingPiece = pieceMap.get(draggedPiece.id);

    //Finding the new row and col to move the piece
    const newRow = parseInt(square.dataset.row as string);
    const newCol = parseInt(square.dataset.col as string);

    //Checking if the move is valid

    if (movingPiece?.isValidMove(newRow, newCol) && movingPiece.isPathFree(newRow, newCol)) 
    { 
        movingPiece?.move(newRow, newCol, square);


        // Wechseln des Spielzugs
        currentTurn = currentTurn === "w" ? "b" : "w";
    }

    });

  
}

export { addDragEvents, addDropEvents };
