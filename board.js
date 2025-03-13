import { createPiece } from "./pieces.js";
import { addDropEvents } from "./drag-drop.js";
<<<<<<< HEAD
// Map Object to store a connection between the images and their objects
const pieceMap = new Map();
// Current board state
let gamePosition = [
    [], [], [], [], [], [], [], []
];
const createBoard = () => {
    const boardElement = document.getElementById("board");
    const letterLabels = ["a", "b", "c", "d", "e", "f", "g", "h"];
=======
//Map Object to store a connection between the images and their objects
const pieceMap = new Map();
//Current board state
let gamePosition = [
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
    const boardElement = document.getElementById("board");
>>>>>>> ad9a233f1daa214800b92fdc13393b1c1c0ab871
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
<<<<<<< HEAD
            square.dataset.row = `${row}`;
            square.dataset.col = `${col}`;
            square.id = letterLabels[col] + (8 - row).toString();
            addDropEvents(square);
            // Adding colors to the squares
            square.classList.add((row + col) % 2 === 0 ? "white" : "green");
            // Creating the pieces
            const color = row < 2 ? "b" : "w";
            const newPiece = createPiece(startPosition[row][col], color, row, col);
            gamePosition[row][col] = newPiece;
            if (newPiece) {
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
=======
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
            }
            else {
                square.classList.add("green");
            }
            //Creating the pieces
            const color = row < 2 ? "b" : "w"; // Giving the right color to the pieces
            const newPiece = createPiece(startPosition[row][col], color, row, col);
            gamePosition[row][col] = newPiece;
            if (newPiece) {
                square.appendChild(newPiece.img); // Appending the image on the square
>>>>>>> ad9a233f1daa214800b92fdc13393b1c1c0ab871
            }
            boardElement.appendChild(square);
        }
    }
};
<<<<<<< HEAD
=======
const addLabels = (square, row, col) => {
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
};
>>>>>>> ad9a233f1daa214800b92fdc13393b1c1c0ab871
createBoard();
export { pieceMap, gamePosition };
