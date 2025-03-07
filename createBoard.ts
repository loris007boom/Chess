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

  // Erstellen des Spielfelds
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

      const piece = startIcons[row * 8 + col];
      if (piece) {
        const img = document.createElement("img");
        const color = row < 2 ? "b" : "w"; // Obere Reihen sind Schwarz (b), untere Weiß (w)
        img.src = `icons/${piece}_${color}.png`;
        img.alt = piece;
        img.className = "piece";
        img.draggable = true;

        // Drag & Drop Events
        img.addEventListener("dragstart", (e) => {
          img.classList.add("dragging");
          e.dataTransfer?.setData("text/plain", img.id);
          setTimeout(() => img.classList.add("hide"), 0); // Versteckt das Bild beim Ziehen
        });

        img.addEventListener("dragend", () => {
          img.classList.remove("dragging");
          img.classList.remove("hide");
        });

        square.appendChild(img);
      }

      // Dragover erlauben
      square.addEventListener("dragover", (e) => {
        e.preventDefault();
      });

      // Drop-Event
      square.addEventListener("drop", (e) => {
        e.preventDefault();
        const draggedPiece = document.querySelector(".dragging") as HTMLElement;
        if (draggedPiece) {
          square.innerHTML = ""; // Entfernt alte Figur
          square.appendChild(draggedPiece);
        }
      });

      boardElement.appendChild(square);
    }
  }
};

createBoard();
