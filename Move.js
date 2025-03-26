class Move {
    constructor(piece, oldRow, oldCol, newRow, newCol, hasCaptured) {
        this.piece = piece;
        this.oldRow = oldRow;
        this.oldCol = oldCol;
        this.newRow = newRow;
        this.newCol = newCol;
        this.hasCaptured = hasCaptured;
    }
}
export { Move };
