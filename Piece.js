import { addDragEvents } from "./drag-drop.js";
import { pieceMap, gamePosition } from "./board.js";
class Piece {
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
        return true;
    }
    canBeCaptured(movingPiece) {
        if (this.color !== movingPiece.color) {
            return true;
        }
        return false;
    }
    capture() {
<<<<<<< HEAD
        this.img.remove();
        gamePosition[this.row][this.col] = null;
        pieceMap.delete(this.img.id);
=======
        gamePosition[this.row][this.col] = null;
        pieceMap.delete(this.img.id);
        const capturedContainer = this.color === "w"
            ? document.getElementById("captured-white")
            : document.getElementById("captured-black");
        if (capturedContainer) {
            this.img.style.width = "40px";
            this.img.style.height = "40px";
            capturedContainer.appendChild(this.img);
        }
>>>>>>> ad9a233f1daa214800b92fdc13393b1c1c0ab871
    }
}
export { Piece };
