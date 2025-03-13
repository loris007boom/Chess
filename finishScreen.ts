import { createBoard } from "./board.js";
import { currentTurn } from "./drag-drop.js"

document.addEventListener("DOMContentLoaded", () => {
  let winColor: string = "";
  if (currentTurn === "w") {
    winColor = "Black"
  }
  else if (currentTurn === "b") {
    winColor = "White"
  } else {
    console.error("Fehler bei der Farbe")
  }
  const popUp = document.getElementById("popUpID") as HTMLDivElement;
  popUp.classList.add('popUp');
  const reStartButton = document.createElement("button");
  reStartButton.classList.add("reStartButton");
  reStartButton.textContent = "Restart";

  // Define the restart function
  reStartButton.addEventListener('click', createBoard);

  popUp.appendChild(reStartButton);
});
