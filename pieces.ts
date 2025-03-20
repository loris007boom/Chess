import { gamePosition } from "./board.js";
import { Piece } from "./Piece.js";

class Pawn extends Piece {
    constructor(color: string, row: number, col: number) {
        super(color, row, col, "pawn");
        this.points = 1;
    }

    isMoveCorrect(newRow: number, newCol: number): boolean {
        //Checking if the piece is moving in the allowed directions
        //First we check for the color because the pawns move in different directions
        if (this.color === "w") {
            if (
                (newRow === this.row - 1 && newCol === this.col && !gamePosition[newRow][newCol]) ||
                //Pawns can move two squares the first move
                (newRow === this.row - 2 && newCol === this.col && this.row === 6 && !gamePosition[newRow][newCol]) ||
                //Pawns can capture diagonally
                (this.row - newRow === 1 && Math.abs(this.col - newCol) === 1 && gamePosition[newRow][newCol])
            ) 
            {
                return true;
            }
        }

        else if (this.color === "b") {
            if (
                (newRow === this.row + 1 && newCol === this.col && !gamePosition[newRow][newCol]) ||
                //Pawns can move two squares the first move
                (newRow === this.row + 2 && newCol === this.col && this.row === 1 && !gamePosition[newRow][newCol]) ||
                //Pawns can capture diagonally
                (this.row - newRow === -1 && Math.abs(this.col - newCol) === 1 && gamePosition[newRow][newCol])
            ) 
            {
                return true;
            }
        }

        return false;
    }
}

class Rook extends Piece {
    hasMoved: boolean;

    constructor(color: string, row: number, col: number) {
        super(color, row, col, "rook");
        this.points = 5;
        this.hasMoved = false;
    }

    isMoveCorrect(newRow: number, newCol: number): boolean {
        //Checking if the piece is moving in the allowed directions
        if (newRow === this.row && newCol !== this.col || newCol === this.col && newRow !== this.row) 
        {
            return true;
        }

        return false;
    }
}

class Knight extends Piece {
    constructor(color: string, row: number, col: number) {
        super(color, row, col, "knight");
        this.points = 3;
    }

    isMoveCorrect(newRow: number, newCol: number): boolean {
        //Checking if the piece is moving in the allowed directions
        if (
            Math.abs(newRow - this.row) === 2 && Math.abs(newCol - this.col) === 1 ||
            Math.abs(newRow - this.row) === 1 && Math.abs(newCol - this.col) === 2
        ) 
        {
            return true;
        }

        return false;
    }

    //The knight can jump over other pieces
    isPathFree(): boolean {
        return true;
    }
}

class Bishop extends Piece {
    constructor(color: string, row: number, col: number) {
        super(color, row, col, "bishop");
        this.points = 3;
    }

    isMoveCorrect(newRow: number, newCol: number): boolean {
        //Checking if the piece is moving in the allowed directions
        if (Math.abs(this.row - newRow) === Math.abs(this.col - newCol)) 
        {
            return true;
        }

        return false;
    }
}

class Queen extends Piece {
    constructor(color: string, row: number, col: number) {
        super(color, row, col, "queen");
        this.points = 9;
    }

    isMoveCorrect(newRow: number, newCol: number): boolean {
        //Checking if the piece is moving in the allowed directions
        if (
            (newRow === this.row && newCol !== this.col || newCol === this.col && newRow !== this.row) ||
            (Math.abs(this.row - newRow) === Math.abs(this.col - newCol))
        ) 
        {
            return true;
        }

        return false;
    }
}

class King extends Piece {

    constructor(color: string, row: number, col: number) {
        super(color, row, col, "king");
    }

    isMoveCorrect(newRow: number, newCol: number): boolean {
        //Checking if the piece is moving in the allowed directions
        if (
            (newRow === this.row && Math.abs(newCol - this.col) === 1) ||
            (newCol === this.col && Math.abs(newRow - this.row) === 1) ||
            (Math.abs(this.row - newRow) === 1 && Math.abs(this.col - newCol) === 1)
        ) 
        {
            return true;
        }

        return false;
    }
}

const createPiece = (piece: string, color: string, row: number, col: number): Piece | null => {
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
}

export { createPiece, King };
