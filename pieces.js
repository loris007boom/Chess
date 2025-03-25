import { gamePosition, pieceMap } from "./board.js";
import { Piece } from "./Piece.js";
class Pawn extends Piece {
    constructor(color, row, col) {
        super(color, row, col, "pawn");
        this.points = 1;
    }
    isMoveCorrect(newRow, newCol) {
        //Checking if the piece is moving in the allowed directions
        //First we check for the color because the pawns move in different directions
        if (this.color === "w") {
            if ((newRow === this.row - 1 && newCol === this.col && !gamePosition[newRow][newCol]) ||
                //Pawns can move two squares the first move
                (newRow === this.row - 2 && newCol === this.col && this.row === 6 && !gamePosition[newRow][newCol]) ||
                //Pawns can capture diagonally
                (this.row - newRow === 1 && Math.abs(this.col - newCol) === 1 && gamePosition[newRow][newCol])) {
                return true;
            }
        }
        else if (this.color === "b") {
            if ((newRow === this.row + 1 && newCol === this.col && !gamePosition[newRow][newCol]) ||
                //Pawns can move two squares the first move
                (newRow === this.row + 2 && newCol === this.col && this.row === 1 && !gamePosition[newRow][newCol]) ||
                //Pawns can capture diagonally
                (this.row - newRow === -1 && Math.abs(this.col - newCol) === 1 && gamePosition[newRow][newCol])) {
                return true;
            }
        }
        return false;
    }
    pawnPromotion() {
        if (this.row === 0 || this.row === 7) {
            const square = this.img.parentElement;
            this.img.remove();
            pieceMap.delete(this.img.id);
            const promotedPiece = createPiece("queen", `${this.color}`, this.row, this.col);
            gamePosition[this.row][this.col] = promotedPiece;
            square === null || square === void 0 ? void 0 : square.appendChild(promotedPiece.img);
        }
    }
}
class Rook extends Piece {
    constructor(color, row, col) {
        super(color, row, col, "rook");
        this.points = 5;
    }
    isMoveCorrect(newRow, newCol) {
        //Checking if the piece is moving in the allowed directions
        if (newRow === this.row && newCol !== this.col || newCol === this.col && newRow !== this.row) {
            return true;
        }
        return false;
    }
}
class Knight extends Piece {
    constructor(color, row, col) {
        super(color, row, col, "knight");
        this.points = 3;
    }
    isMoveCorrect(newRow, newCol) {
        //Checking if the piece is moving in the allowed directions
        if (Math.abs(newRow - this.row) === 2 && Math.abs(newCol - this.col) === 1 ||
            Math.abs(newRow - this.row) === 1 && Math.abs(newCol - this.col) === 2) {
            return true;
        }
        return false;
    }
    //The knight can jump over other pieces
    isPathFree() {
        return true;
    }
}
class Bishop extends Piece {
    constructor(color, row, col) {
        super(color, row, col, "bishop");
        this.points = 3;
    }
    isMoveCorrect(newRow, newCol) {
        //Checking if the piece is moving in the allowed directions
        if (Math.abs(this.row - newRow) === Math.abs(this.col - newCol)) {
            return true;
        }
        return false;
    }
}
class Queen extends Piece {
    constructor(color, row, col) {
        super(color, row, col, "queen");
        this.points = 9;
    }
    isMoveCorrect(newRow, newCol) {
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
    isMoveCorrect(newRow, newCol) {
        //Checking if the piece is moving in the allowed directions
        if ((newRow === this.row && Math.abs(newCol - this.col) === 1) ||
            (newCol === this.col && Math.abs(newRow - this.row) === 1) ||
            (Math.abs(this.row - newRow) === 1 && Math.abs(this.col - newCol) === 1) ||
            //Checking if the king can castle
            (this.canCastle(newRow, newCol) && !this.isCheck(this.row, this.col))) {
            return true;
        }
        return false;
    }
    canCastle(newRow, newCol) {
        //Checking if move is valid and the king never moved
        if (newRow === this.row && Math.abs(newCol - this.col) === 2 && !this.hasMoved) {
            //Searching the coordinates of the rook and its new coordinates
            let rook;
            //Short castle
            if (newCol > this.col) {
                rook = gamePosition[this.row][7];
                //Checking that towards the path of the king no square is in check
                for (let row of gamePosition) {
                    for (let piece of row) {
                        if (piece && piece.color !== this.color && piece.isMoveCorrect(this.row, this.col + 1) &&
                            piece.isPathFree(this.row, this.col + 1) && piece.canCapture(this.row, this.col + 1)) {
                            return false;
                        }
                    }
                }
            }
            //Long castle
            else {
                rook = gamePosition[this.row][0];
                //For the long castle we need to check that the square on the second column is empty
                if (gamePosition[this.row][1]) {
                    return false;
                }
                //Checking that towards the path of the king no square is in check
                for (let row of gamePosition) {
                    for (let piece of row) {
                        if (piece && piece.color !== this.color && piece.isMoveCorrect(this.row, this.col - 1) &&
                            piece.isPathFree(this.row, this.col - 1) && piece.canCapture(this.row, this.col - 1)) {
                            return false;
                        }
                    }
                }
            }
            //Checking if it's a rook and hasn't moved yet
            if (rook instanceof Rook && !this.hasMoved) {
                return true;
            }
        }
        return false;
    }
    castle(newCol) {
        //Taking hold of the rook to move and its new coordinates
        let rook;
        let newRookCol;
        if (newCol > this.col) {
            rook = gamePosition[this.row][7];
            newRookCol = this.col + 1;
        }
        else {
            rook = gamePosition[this.row][0];
            newRookCol = this.col - 1;
        }
        //Finding the new square and moving the rook
        const newSquare = document.getElementById(`${this.row}${newRookCol}`);
        rook === null || rook === void 0 ? void 0 : rook.move(this.row, newRookCol, newSquare);
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
export { createPiece, King, Pawn };
