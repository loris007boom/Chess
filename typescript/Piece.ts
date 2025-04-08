import { addDragEvents } from './drag-drop.js';
import { pieceMap, gamePosition } from './board.js';
import { King, Queen, Rook, Pawn } from './pieces.js';
import { vCheck_On, vCheck_Off } from './vfx.js';
import { showWinnerPopup } from './winningScreen.js';
import { gameOver } from './UI.js';


class Piece {
    img: HTMLImageElement;
    color: string;
    row: number;
    col: number;
    points: number;
    hasMoved: boolean;

    // static blackScore: number = 0;
    // static whiteScore: number = 0;

    constructor(color: string, row: number, col: number, name: string, id: string) {
        //Creating the img
        const imgLink = `icons/${name}_${color}.png`;
        const img = document.createElement("img");
        img.src = imgLink;
        img.alt = `${name}-${color}`;
        img.className = "piece";
        img.id = id;
        img.draggable = true;
        addDragEvents(img);

        this.img = img;

        this.color = color;
        this.row = row;
        this.col = col;
        this.points = 0;
        this.hasMoved = false;
    }

    move(newRow: number, newCol: number, newSquare: HTMLElement): void {
        //Appending the img on the new square
        newSquare.appendChild(this.img);


        //Updating the game position
        gamePosition[this.row][this.col] = null;
        gamePosition[newRow][newCol] = this;
        this.row = newRow;
        this.col = newCol;
        if (!this.hasMoved)
        {
            this.hasMoved = true;
        }

        //Checking if it is checkmate or a draw
        const opposingColor = this.color === "w" ? "b" : "w";

        if (Piece.isCheckmate(opposingColor))
        {
            gameOver();
            //It's a draw
            if (!this.isCheck(newRow, newCol, opposingColor))
            {
                showWinnerPopup();
            }
            //It's checkmate
            else
            {
                //If no moves would block the checkmate, show winning screen
                const winColor = this.color;
                showWinnerPopup(winColor);
            }
        }

        //Checking if the position is a draw
        if (Piece.isPositionDraw())
        {
            gameOver();
            showWinnerPopup();
        }
    }

    isMoveValid(newRow: number, newCol: number): boolean {
        //Checking all together if the move is valid
        if (
            this.isMoveCorrect(newRow, newCol) && this.isPathFree(newRow, newCol) && 
            this.canCapture(newRow, newCol) && !this.isCheck(newRow, newCol, this.color) 
           )
        {
            return true;
        }
        return false;
    }

    isMoveCorrect(newRow: number, newCol: number): boolean {
        return false;
    }

    isPathFree(newRow: number, newCol: number): boolean {
        //Checking the difference between the rows and columns
        const numSquares = Math.abs(this.row === newRow ? this.col - newCol : this.row - newRow);
        for (let i = 1; i < numSquares; i++) {
            //Checking whether the row and column stay the same, are increased or reduced
            const rowToCheck = this.row === newRow ? this.row : this.row < newRow ? this.row + i : this.row - i;
            const colToCheck = this.col === newCol ? this.col : this.col < newCol ? this.col + i : this.col - i;

            if (gamePosition[rowToCheck][colToCheck]) {
                return false;
            }
        }
        return true;
    }

    isCheck(newRow: number, newCol: number, color: string): boolean {
        //Controlling that if the piece moves its king won't be in check

        //Taking hold of the king
        const king = this.findKing(color);

        //Temporary movement of the piece to see what its new position would be
        const newSquare = gamePosition[newRow][newCol];
        gamePosition[this.row][this.col] = null;
        gamePosition[newRow][newCol] = this;

        //Row and column where the king is
        let kingRow = king.row;
        let kingCol = king.col;
        //Like this, if the king itself is moving it doesn't take the old coordinates
        if (this instanceof King && this.color === king.color)
        {
            kingRow = newRow;
            kingCol = newCol;
        }

        //Iterating through every opposing piece
        for (const row of gamePosition)
        {
            for (const piece of row)
            {
                //Checking if any opposing piece can attack the king
                if (
                    piece && piece.color !== king.color && piece.isMoveCorrect(kingRow, kingCol) && 
                    piece.isPathFree(kingRow, kingCol) && piece.canCapture(kingRow, kingCol)
                   )
                {
                    //Setting the board how it was before
                    gamePosition[newRow][newCol] = newSquare;
                    gamePosition[this.row][this.col] = this;
                    vCheck_On(king);
                    return true;
                }
            }
        }

        //Setting the board how it was before
        gamePosition[newRow][newCol] = newSquare;
        gamePosition[this.row][this.col] = this;
        vCheck_Off(king);
        return false;
    }

    findKing(color: string): King {
        //Searching for the king
        for (const row of gamePosition)
        {
            for (const piece of row)
            {
                if (piece instanceof King && piece.color === color)
                {
                    if (this instanceof King && piece.color === color)
                    {
                        return this;
                    }
                    return piece;
                }
            }
        }
        throw new Error("King not found!!!");
    }

    canCapture(newRow: number, newCol: number): boolean {
        //Checking if there is a piece to capture on the landing square and if it can be captured
        const pieceToCapture = gamePosition[newRow][newCol];
        if (!pieceToCapture || this.color !== pieceToCapture.color) {
            return true;
        }
        return false;
    }

    capture(): void {
        this.img.remove();
        gamePosition[this.row][this.col] = null;
        pieceMap.delete(this.img.id);

        const capturedContainer =
            this.color === "w" ? document.getElementById("captured-white") : document.getElementById("captured-black");

        if (capturedContainer) {

            this.img.style.width = "40px";
            this.img.style.height = "40px";
            capturedContainer.appendChild(this.img);
        }
    }

    static isCheckmate(color: string): boolean {
        //Iterating through each piece
        for (let pieceRow = 0; pieceRow < gamePosition.length; pieceRow++)
        {
            for (let pieceCol = 0; pieceCol < 8; pieceCol++)
            {
                //Checking only opponent's pieces
                if (gamePosition[pieceRow][pieceCol]?.color === color)
                {
                    //Iterating through every square 
                    for (let row = 0; row < gamePosition.length; row++)
                    {
                        for (let col = 0; col < 8; col++)
                        {
                            //Checking if there is a move with a piece that would block the checkmate
                            if (gamePosition[pieceRow][pieceCol]?.isMoveValid(row, col))
                            {
                                return false;
                            }
                        }
                    }
                }
            }
        }
        return true;
    }

    static isPositionDraw(): boolean {
        //Counting the pieces on the board
        let piecesCount = 0;
        for (let row of gamePosition)
        {
            for (let piece of row)
            {
                if (piece)
                {
                    //If there is a queen, rook or pawn, it's not a draw
                    if (piece instanceof Queen || piece instanceof Rook || piece instanceof Pawn)
                    {
                        return false;
                    }

                    piecesCount++;
                }
            }
        }

        //If the pieces are equal or less than 3, with no queens, rooks and pawns, it's a draw
        return piecesCount <= 3;
    }
}

export { Piece };
