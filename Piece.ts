import { addDragEvents } from "./drag-drop.js";
import { pieceMap, gamePosition } from "./board.js";

class Piece
{
    img: HTMLImageElement;
    color: string;
    row: number;
    col: number;

    constructor(color: string, row: number, col: number, name: string)
    {
        //Creating the img
        const imgLink = `icons/${name}_${color}.png`
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

    move(newRow: number, newCol: number, newSquare: HTMLElement): void
    {
        //Appending the img on the new square
        newSquare.appendChild(this.img);

        //Updating the game position
        gamePosition[this.row][this.col] = null;
        gamePosition[newRow][newCol] = this;
        this.row = newRow;
        this.col = newCol;
    }

    isValidMove(newRow: number, newCol: number): boolean
    {
        return false;
    }

    isPathFree(newRow: number, newCol: number): boolean
    {
        return true;
    }

    canBeCaptured(movingPiece: Piece)
    {
        if (this.color !== movingPiece.color)
        {
            return true;
        }
        return false;
    }

    capture()
    {
        this.img.remove();
        gamePosition[this.row][this.col] = null;
        pieceMap.delete(this.img.id);
    }
}

export { Piece };
