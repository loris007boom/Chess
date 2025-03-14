import { addDragEvents } from "./drag-drop.js";
import { pieceMap, gamePosition } from "./board.js";
class Piece {
    // static blackScore: number = 0;
    // static whiteScore: number = 0;
    constructor(color, row, col, name) {
        //Creating the img
        const imgLink = `icons/${name}_${color}.png`;
        const img = document.createElement("img");
        img.src = imgLink;
        img.alt = name;
        img.className = "piece";
        img.id = `${row}-${col}`;
        img.draggable = true;
        addDragEvents(img);
        this.img = img;
        this.color = color;
        this.row = row;
        this.col = col;
        this.points = 0;
        //Saving in the map the img id with its object for future references
        pieceMap.set(img.id, this);
    }
    move(newRow, newCol, newSquare) {
        //Appending the img on the new square
        newSquare.appendChild(this.img);
        //Updating the game position
        gamePosition[this.row][this.col] = null;
        gamePosition[newRow][newCol] = this;
        this.row = newRow;
        this.col = newCol;
    }
    isValidMove(newRow, newCol) {
        return false;
    }
    isPathFree(newRow, newCol) {
        //Checking the difference between the rows and columns
        const numSquares = Math.abs(this.row - newRow === 0 ? this.col - newCol : this.row - newRow);
        for (let i = 1; i < numSquares; i++) {
            //Checking whether the row and column stay the same, are increased or reduced
            const rowToCheck = this.row === newRow ? this.row : this.row < newRow ? this.row + i : this.row - i;
            const colToCheck = this.col === newCol ? this.col : this.col < newCol ? this.col + i : this.col - i;
            if (gamePosition[rowToCheck][colToCheck]) {
                return false;
            }
        }
        //Checking if there is a piece to capture on the landing square and if it can be captured
        const lastRowToCheck = this.row === newRow ? this.row :
            this.row < newRow ? this.row + numSquares : this.row - numSquares;
        const lastColToCheck = this.col === newCol ? this.col :
            this.col < newCol ? this.col + numSquares : this.col - numSquares;
        const pieceToCapture = gamePosition[lastRowToCheck][lastColToCheck];
        if (!pieceToCapture || pieceToCapture.canBeCaptured(this)) {
            pieceToCapture === null || pieceToCapture === void 0 ? void 0 : pieceToCapture.capture();
            return true;
        }
        return false;
    }
    canBeCaptured(movingPiece) {
        if (this.color !== movingPiece.color) {
            return true;
        }
        return false;
    }
    capture() {
        this.img.remove();
        gamePosition[this.row][this.col] = null;
        pieceMap.delete(this.img.id);
        // if (this.color === "w") {
        //     console.log("Schwarzer Score1:", Piece.blackScore);
        //     console.log("Schwarzer points1:", this.points);
        //     Piece.blackScore += this.points;
        //     console.log("Schwarzer Score2:", Piece.blackScore);
        //     console.log("Schwarzer points2:", this.points);
        // } else if (this.color === "b") {
        //     console.log("Weisser Score1:", Piece.whiteScore);
        //     console.log("Weisser points1:", this.points);
        //     Piece.whiteScore += this.points;
        //     console.log("Weisser Score2:", Piece.whiteScore);
        //     console.log("Weisser points1:", this.points);
        // }
        const capturedContainer = this.color === "w" ? document.getElementById("captured-white") : document.getElementById("captured-black");
        // const scoreCounter =
        //     this.color === "w" ? document.getElementById("captured-white-score") : document.getElementById("captured-black-score");
        // if (scoreCounter) {
        //     console.log('jbhg')
        //     scoreCounter.textContent = `Score: ${this.color === "w" ? Piece.whiteScore : Piece.blackScore}`;
        // }
        if (capturedContainer) {
            this.img.style.width = "40px";
            this.img.style.height = "40px";
            capturedContainer.appendChild(this.img);
        }
    }
}
export { Piece };
