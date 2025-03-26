import { Piece } from "./Piece.js";

class Move {
    piece: Piece;
    oldRow: number;
    oldCol: number;
    newRow: number;
    newCol: number;
    hasCaptured: boolean;

    constructor(piece: Piece, oldRow: number, oldCol: number, newRow: number, newCol: number, hasCaptured: boolean) {
        this.piece = piece;
        this.oldRow = oldRow;
        this.oldCol = oldCol;
        this.newRow = newRow;
        this.newCol = newCol;
        this.hasCaptured = hasCaptured;
    }
}

export { Move };
