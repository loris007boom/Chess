const createBoard = () => {
  const boardElement = document.getElementById("board") as HTMLElement;

  const startIcons: string[] = [
    'rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook',
    'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn',
    'rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'
  ];

  // Erstellen des Spielfeldes
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div") as HTMLDivElement;
      square.classList.add("square");
      square.id = `${row}${col}`;

      // Farbgebung der Felder
      if ((row + col) % 2 === 0) {
        square.classList.add("white");
      } else {
        square.classList.add("green");
      }

      const piece = startIcons[row * 8 + col]; // Richtige Figur aus der Liste holen
      if (piece) {
        const img = document.createElement("img");
        const color = row < 2 ? "b" : "w"; // Obere Reihen sind Schwarz (b), untere Weiß (w)
        img.src = `icons/${piece}_${color}.png`; // Beispiel: "icons/b_pawn.png"
        img.alt = piece;
        img.className = 'piece'
        square.appendChild(img); // Bild an Feld übergeben
      }

      boardElement.appendChild(square);
    }
  }
};

createBoard();