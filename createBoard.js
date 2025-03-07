var createBoard = function () {
    var boardElement = document.getElementById("board");
    var startIcons = [
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
    for (var row = 0; row < 8; row++) {
        var _loop_1 = function (col) {
            var square = document.createElement("div");
            square.classList.add("square");
            square.id = "".concat(row).concat(col);
            // Farbgebung der Felder
            if ((row + col) % 2 === 0) {
                square.classList.add("white");
            }
            else {
                square.classList.add("green");
            }
            var piece = startIcons[row * 8 + col];
            if (piece) {
                var img_1 = document.createElement("img");
                var color = row < 2 ? "b" : "w"; // Obere Reihen sind Schwarz (b), untere Weiß (w)
                img_1.src = "icons/".concat(piece, "_").concat(color, ".png");
                img_1.alt = piece;
                img_1.className = "piece";
                img_1.draggable = true;
                // Drag & Drop Events
                img_1.addEventListener("dragstart", function (e) {
                    var _a;
                    img_1.classList.add("dragging");
                    (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData("text/plain", img_1.id);
                    setTimeout(function () { return img_1.classList.add("hide"); }, 0); // Versteckt das Bild beim Ziehen
                });
                img_1.addEventListener("dragend", function () {
                    img_1.classList.remove("dragging");
                    img_1.classList.remove("hide");
                });
                square.appendChild(img_1);
            }
            // Dragover erlauben
            square.addEventListener("dragover", function (e) {
                e.preventDefault();
            });
            // Drop-Event
            square.addEventListener("drop", function (e) {
                e.preventDefault();
                var draggedPiece = document.querySelector(".dragging");
                if (draggedPiece) {
                    square.innerHTML = ""; // Entfernt alte Figur
                    square.appendChild(draggedPiece);
                }
            });
            boardElement.appendChild(square);
        };
        for (var col = 0; col < 8; col++) {
            _loop_1(col);
        }
    }
};
createBoard();
