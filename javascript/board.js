import { createPiece } from './pieces.js';
import { addDropEvents } from './drag-drop.js';
// Map Object to store a connection between the images and their objects
const pieceMap = new Map();
const moves = [];
// Current board state
let gamePosition = [
    [], [], [], [], [], [], [], []
];
const createBoard = () => {
    const boardElement = document.getElementById("board");
    const letterLabels = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const startPosition = [
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
            const square = document.createElement("div");
            square.classList.add("square");
            square.dataset.row = `${row}`;
            square.dataset.col = `${col}`;
            square.id = `${row}${col}`;
            addDropEvents(square);
            // Adding colors to the squares
            square.classList.add((row + col) % 2 === 0 ? "white" : "green");
            // Creating the pieces
            const color = row < 2 ? "b" : "w";
            const newPiece = createPiece(startPosition[row][col], color, row, col, `${row}-${col}`);
            gamePosition[row][col] = newPiece;
            if (newPiece) {
                //Saving in the map the img id with its object for future references
                pieceMap.set(newPiece.img.id, newPiece);
                square.appendChild(newPiece.img);
            }
            // Adding labels only for the bottom row and left column
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
            boardElement.appendChild(square);
        }
    }
};
export { pieceMap, gamePosition, createBoard, moves };
