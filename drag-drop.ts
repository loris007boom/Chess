import { gamePosition, pieceMap, moves } from "./board.js";
import { King, Pawn } from "./pieces.js";
import { Move } from "./Move.js";

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
      let pieceToCapture = gamePosition[newRow][newCol];

      /*Checking if the move is an en passant and changing the piece to capture 
        (only move where the capture is not on the landing square) */
      if (movingPiece instanceof Pawn && movingPiece.canEnPassant(newRow, newCol))
      {
        if (newRow === 2)
        {
          pieceToCapture = gamePosition[newRow + 1][newCol];
        }
        else if (newRow === 5)
        {
          pieceToCapture = gamePosition[newRow - 1][newCol];
        }
      }

      pieceToCapture?.capture();

      //Collecting the move instance
      const hasCaptured = pieceToCapture ? true : false;
      const move = new Move(movingPiece, movingPiece.row, movingPiece.col, newRow, newCol, hasCaptured);
      moves.push(move);

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
