import { intervalID } from "./counter.js";
const showWinnerPopup = (color) => {
    const winColor = color === "w" ? "White" : "Black";
    const popUp = document.getElementById("popUpID");
    if (!popUp) {
        console.error("Fehler: Das Pop-up-Element wurde nicht gefunden.");
        return;
    }
    popUp.classList.add("popUp");
    popUp.style.display = "flex";
    const reStartButton = document.createElement("button");
    reStartButton.classList.add("reStartButton");
    reStartButton.textContent = "Restart";
    const message = document.createElement("p");
    message.classList.add("message");
    message.textContent = `${winColor} Player Won! 🎉🏆`;
    reStartButton.addEventListener("click", () => window.location.reload());
    popUp.innerHTML = "";
    popUp.appendChild(message);
    popUp.appendChild(reStartButton);
    clearInterval(intervalID);
};
export { showWinnerPopup };
