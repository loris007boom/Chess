import { gamePosition, pieceMap } from "./board.js";
import { King, Pawn } from "./pieces.js";

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
    if (movingPiece?.isMoveValid(newRow, newCol)) {
      //Moving and capturing the piece if there is one
      const pieceToCapture = gamePosition[newRow][newCol];
      pieceToCapture?.capture();

      //Castling if it is a castle
      if (movingPiece instanceof King && movingPiece.canCastle(newRow, newCol))
      {
        movingPiece.castle(newCol);
      }

      movingPiece?.move(newRow, newCol, square);

      //Promoting pawns
      if (movingPiece instanceof Pawn)
      {
        movingPiece.pawnPromotion();
      }


      // Wechseln des Spielzugs
      currentTurn = currentTurn === "w" ? "b" : "w";
    }
    
    });
}

export { addDragEvents, addDropEvents, currentTurn };

setInterval(() => {
  currentTurn = currentTurn;
}, 10);

export function getCurrentTurn() {
  return currentTurn;
}
