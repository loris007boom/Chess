import { getCurrentTurn } from './drag-drop.js';
import { showWinnerPopup } from './winningScreen.js';
import { createBoard } from './board.js';
import { Piece } from './Piece.js';
let intervalID;
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
let selectedTime = null;
let timeLeft;
let counter1 = null;
let counter2 = null;
const playerTurn = () => {
    const whichPlayerTurn = document.getElementById("whichPlayerTurn");
    const color = getCurrentTurn() === "w" ? "White's Turn" : "Black's Turn";
    whichPlayerTurn.textContent = color;
};
document.querySelectorAll('.TimeButtons').forEach((button) => {
    button.addEventListener('click', function () {
        pauseButton.style.display = "block";
        selectedTime = parseInt(this.value, 10);
        if (selectedTime !== null) {
            timeLeft = selectedTime * 60;
            counter1 = createCounter("counter1", timeLeft);
            counter2 = createCounter("counter2", timeLeft);
            counter1 === null || counter1 === void 0 ? void 0 : counter1.stop();
            counter2 === null || counter2 === void 0 ? void 0 : counter2.stop();
        }
    });
});
const pauseButton = document.getElementById("pauseAll");
const TimeButtonContainer = document.getElementById('TimeButtonContainer');
const surrenderButton = document.getElementById("surrenderButton");
let hasGameEnded = false;
let winColor = getCurrentTurn();
if (pauseButton) {
    pauseButton.addEventListener("click", () => {
        createBoard();
        surrenderButton.style.display = "block";
        pauseButton.style.display = "none";
        TimeButtonContainer.style.display = "none";
        intervalID = setInterval(function () {
            playerTurn();
            if (surrenderButton) {
                surrenderButton.addEventListener("click", () => {
                    hasGameEnded = true;
                    showWinnerPopup(winColor);
                });
            }
            if (Piece.isCheckmate(winColor)) {
                hasGameEnded = true;
            }
            if (hasGameEnded) {
                clearInterval(intervalID);
                counter1 === null || counter1 === void 0 ? void 0 : counter1.stop();
                counter2 === null || counter2 === void 0 ? void 0 : counter2.stop();
                return;
            }
            else if (getCurrentTurn() === "b") {
                counter1 === null || counter1 === void 0 ? void 0 : counter1.resume();
                counter2 === null || counter2 === void 0 ? void 0 : counter2.stop();
                winColor = "w";
            }
            else if (getCurrentTurn() === "w") {
                counter1 === null || counter1 === void 0 ? void 0 : counter1.stop();
                counter2 === null || counter2 === void 0 ? void 0 : counter2.resume();
                winColor = "b";
            }
        }, 1);
    });
}
