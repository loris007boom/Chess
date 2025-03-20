import { getCurrentTurn } from "./drag-drop.js";

const showWinnerPopup = (color: string) => {
    const winColor = color === "w" ? "White" : "Black";

    const popUp = document.getElementById("popUpID") as HTMLDivElement | null;
    if (!popUp) {
      console.error("Fehler: Das Pop-up-Element wurde nicht gefunden.");
      return;
    }
  
    popUp.classList.add("popUp");
    popUp.style.display = "flex";
  
    const reStartButton = document.createElement("button");
    reStartButton.classList.add("reStartButton");
    reStartButton.textContent = "Restart";
  
    const message = document.createElement("p") as HTMLParagraphElement;
    message.classList.add("message");
    message.textContent = `${winColor} Player Won! 🎉🏆`;
  
    reStartButton.addEventListener("click", () => window.location.reload());
  
    popUp.innerHTML = "";
    popUp.appendChild(message);
    popUp.appendChild(reStartButton);
}; 
export {showWinnerPopup};
