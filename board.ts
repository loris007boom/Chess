import { createPiece } from "./pieces.js";
import { Piece } from "./Piece.js";
import { addDropEvents } from "./drag-drop.js";

//Map Object to store a connection between the images and their objects
const pieceMap = new Map<string, Piece>();

//Current board state
let gamePosition: (Piece | null)[][] = [
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  []
];

const createBoard = () => {
  const boardElement = document.getElementById("board") as HTMLElement;
 
  const startPosition: string[][] = [
    ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'],
    ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
    ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook']
  ];

  // Creating the squares
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div") as HTMLDivElement;
      square.classList.add("square");
      //Adding coordinates as data attributes for later usage
      square.dataset.row = `${row}`;
      square.dataset.col = `${col}`;
      // // Adding labels only for the bottom row and left column
      addLabels(square, row, col);
      //Adding drop events
      addDropEvents(square);

      // Adding colors to the squares
      if ((row + col) % 2 === 0) {
        square.classList.add("white");
      } else {
        square.classList.add("green");
      }

      //Creating the pieces
      const color = row < 2 ? "b" : "w"; // Giving the right color to the pieces
      const newPiece = createPiece(startPosition[row][col], color, row, col);
      gamePosition[row][col] = newPiece;
      if (newPiece)
      {
        square.appendChild(newPiece.img); // Appending the image on the square
      }
      
      boardElement.appendChild(square);
    }
  }
};

const addLabels = (square: HTMLElement, row: number, col: number) => {
  const letterLabels = ["a", "b", "c", "d", "e", "f", "g", "h"];

  if (row === 7) {
    const rowLabel = document.createElement("p");
    rowLabel.classList.add("squareLabelRow");
    rowLabel.textContent = letterLabels[col];
    square.appendChild(rowLabel);
  }
  if (col === 0) {
    const colLabel = document.createElement("p");
    colLabel.classList.add("squareLabelCol");
    colLabel.textContent = (8 - row).toString();
    square.appendChild(colLabel);
  }
}

createBoard();

export { pieceMap, gamePosition };
