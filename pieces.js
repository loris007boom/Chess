import { gamePosition } from "./board.js";
import { Piece } from "./Piece.js";
class Pawn extends Piece {
    constructor(color, row, col) {
        super(color, row, col, "pawn");
    }
    isValidMove(newRow, newCol) {
        //Checking if the piece is moving in the allowed directions
        //First we check for the color because the pawns move in different directions
        if (this.color === "w") {
            if (newRow === this.row - 1 && newCol === this.col ||
                //Pawns can move two squares the first move
                newRow === this.row - 2 && newCol === this.col && this.row === 6) {
                return true;
            }
        }
        else if (this.color === "b") {
            if (newRow === this.row + 1 && newCol === this.col ||
                //Pawns can move two squares the first move
                newRow === this.row + 2 && newCol === this.col && this.row === 1) {
                return true;
            }
        }
        return false;
    }
}
class Rook extends Piece {
    constructor(color, row, col) {
        super(color, row, col, "rook");
    }
    isValidMove(newRow, newCol) {
        //Checking if the piece is moving in the allowed directions
        if (newRow === this.row && newCol !== this.col || newCol === this.col && newRow !== this.row) {
            //Checking if there are pieces on the way
            if (this.isPathFree(newRow, newCol)) {
                return true;
            }
        }
        return false;
    }
    isPathFree(newRow, newCol) {
        if (newCol === this.col) {
            for (let i = Math.min(this.row, newRow) + 1; i < Math.max(this.row, newRow); i++) {
                if (gamePosition[i][this.col]) {
                    return false;
                }
            }
            return true;
        }
        if (newRow === this.row) {
            for (let i = Math.min(this.col, newCol) + 1; i < Math.max(this.col, newCol); i++) {
                if (gamePosition[this.row][i]) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
}
class Knight extends Piece {
    constructor(color, row, col) {
        super(color, row, col, "knight");
    }
    isValidMove(newRow, newCol) {
        //Checking if the piece is moving in the allowed directions
        if (Math.abs(newRow - this.row) === 2 && Math.abs(newCol - this.col) === 1 ||
            Math.abs(newRow - this.row) === 1 && Math.abs(newCol - this.col) === 2) {
            return true;
        }
        return false;
    }
}
class Bishop extends Piece {
    constructor(color, row, col) {
        super(color, row, col, "bishop");
    }
    isValidMove(newRow, newCol) {
        //Checking if the piece is moving in the allowed directions
        if (Math.abs(this.row - newRow) === Math.abs(this.col - newCol)) {
            if (this.isPathFree(newRow, newCol)) {
                return true;
            }
        }
        return false;
    }
    isPathFree(newRow, newCol) {
        for (let i = Math.min(this.row, newRow) + 1; i < Math.max(this.row, newRow); i++) {
            if (gamePosition[i][i]) {
                return false;
            }
        }
        return true;
    }
}
class Queen extends Piece {
    constructor(color, row, col) {
        super(color, row, col, "queen");
    }
    isValidMove(newRow, newCol) {
        //Checking if the piece is moving in the allowed directions
        if ((newRow === this.row && newCol !== this.col || newCol === this.col && newRow !== this.row) ||
            (Math.abs(this.row - newRow) === Math.abs(this.col - newCol))) {
            return true;
        }
        return false;
    }
}
class King extends Piece {
    constructor(color, row, col) {
        super(color, row, col, "king");
    }
    isValidMove(newRow, newCol) {
        //Checking if the piece is moving in the allowed directions
        if (((newRow === this.row && (newCol === this.col + 1 || newCol === this.col - 1)) ||
            (newCol === this.col && (newRow === this.row + 1 || newRow === this.row - 1))) ||
            (Math.abs(this.row - newRow) === 1 && Math.abs(this.col - newCol) === 1)) {
            return true;
        }
        return false;
    }
}
const createPiece = (piece, color, row, col) => {
    switch (piece) {
        case "pawn":
            return new Pawn(color, row, col);
        case "rook":
            return new Rook(color, row, col);
        case "knight":
            return new Knight(color, row, col);
        case "bishop":
            return new Bishop(color, row, col);
        case "queen":
            return new Queen(color, row, col);
        case "king":
            return new King(color, row, col);
        default:
            return null;
    }
};
export { createPiece };
