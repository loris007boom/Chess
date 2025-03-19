import { getCurrentTurn } from './drag-drop.js';
import { showWinnerPopup } from './winningScreen.js';
const createCounter = (elementId, timeLeft) => {
    const counterElement = document.getElementById(elementId);
    if (!counterElement) {
        console.error(`Element mit ID '${elementId}' nicht gefunden.`);
        return null;
    }
    let timer = null;
    let running = false;
    const updateDisplay = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        counterElement.textContent = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    };
    const startTimer = () => {
        if (running)
            return;
        running = true;
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            }
            else {
                const winColor = getCurrentTurn() === "w" ? "b" : "w";
                showWinnerPopup(winColor);
            }
        }, 1000);
    };
    const stopTimer = () => {
        if (timer) {
            clearInterval(timer);
            timer = null;
            running = false;
        }
    };
    updateDisplay();
    return {
        stop: stopTimer,
        resume: startTimer,
    };
};
const updatePlayerTurn = () => {
    const whichPlayerTurnElement = document.getElementById('whichPlayerTurn');
    const currentTurn = getCurrentTurn();
    whichPlayerTurnElement.textContent = currentTurn === "w" ? "White's turn" : "Black's turn";
};
const showWinnerPopup = () => {
    let winColor = getCurrentTurn() === "w" ? "Black" : "White";
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
    popUp.innerHTML = ""; // Verhindert doppeltes Einfügen
    popUp.appendChild(message);
    popUp.appendChild(reStartButton);
};
let selectedTime = null;
let timeLeft;
let counter1 = null;
let counter2 = null;
document.querySelectorAll('.TimeButtons').forEach((button) => {
    button.addEventListener('click', function () {
        selectedTime = parseInt(this.value, 10);
        if (selectedTime !== null) {
            timeLeft = selectedTime * 60;
            counter1 = createCounter("counter1", timeLeft);
            counter2 = createCounter("counter2", timeLeft);
            counter1 === null || counter1 === void 0 ? void 0 : counter1.stop();
            counter2 === null || counter2 === void 0 ? void 0 : counter2.stop();
            const pauseButton = document.getElementById("pauseAll");
            const TimeButtonContainer = document.getElementById('TimeButtonContainer');
            if (pauseButton) {
                pauseButton.addEventListener("click", () => {
                    TimeButtonContainer.remove();
                    setInterval(function () {
                        if (getCurrentTurn() === "b") {
                            counter1 === null || counter1 === void 0 ? void 0 : counter1.resume();
                            counter2 === null || counter2 === void 0 ? void 0 : counter2.stop();
                        }
                        else if (getCurrentTurn() === "w") {
                            counter1 === null || counter1 === void 0 ? void 0 : counter1.stop();
                            counter2 === null || counter2 === void 0 ? void 0 : counter2.resume();
                        }
                        updatePlayerTurn();
                    }, 1000);
                });
            }
            updatePlayerTurn();
        }
    });
});
export { showWinnerPopup };
