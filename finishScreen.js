<<<<<<< HEAD
import { createBoard } from "./board.js";
=======
>>>>>>> ba28ebffe62be1289a787c2e4fe4ab485d12c7a9
import { currentTurn } from "./drag-drop.js";
document.addEventListener("DOMContentLoaded", () => {
    let winColor = "";
    if (currentTurn === "w") {
        winColor = "Black";
    }
    else if (currentTurn === "b") {
        winColor = "White";
    }
    else {
        console.error("Fehler bei der Farbe");
    }
    const popUp = document.getElementById("popUpID");
    popUp.classList.add('popUp');
    const reStartButton = document.createElement("button");
    reStartButton.classList.add("reStartButton");
    reStartButton.textContent = "Restart";
    // Define the restart function
<<<<<<< HEAD
    reStartButton.addEventListener('click', createBoard);
=======
    reStartButton.addEventListener('click', () => window.location.reload());
>>>>>>> ba28ebffe62be1289a787c2e4fe4ab485d12c7a9
    popUp.appendChild(reStartButton);
});
