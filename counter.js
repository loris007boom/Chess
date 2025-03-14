import { getCurrentTurn } from './drag-drop.js';
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
                clearInterval(timer);
                counterElement.textContent = "Zeit abgelaufen!";
                running = false;
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
let isGameRunning = false;
let counter1 = null;
let counter2 = null;
document.querySelectorAll('.TimeButtons').forEach((button) => {
    button.addEventListener('click', function () {
        selectedTime = parseInt(this.value, 10);
        console.log(selectedTime);
        if (selectedTime !== null) {
            timeLeft = selectedTime * 60;
            console.log(timeLeft);
            counter1 = createCounter("counter1", timeLeft);
            counter2 = createCounter("counter2", timeLeft);
            counter1 === null || counter1 === void 0 ? void 0 : counter1.stop();
            counter2 === null || counter2 === void 0 ? void 0 : counter2.stop();
            const pauseButton = document.getElementById("pauseAll");
            if (pauseButton) {
                pauseButton.textContent = "Start"; // Initial button text
                pauseButton.addEventListener("click", () => {
                    if (!isGameRunning) {
                        // Start the game
                        isGameRunning = true;
                        // Start the timer based on the current turn
                        setInterval(function () {
                            if (getCurrentTurn() === "b") {
                                counter1 === null || counter1 === void 0 ? void 0 : counter1.resume();
                                counter2 === null || counter2 === void 0 ? void 0 : counter2.stop();
                            }
                            else if (getCurrentTurn() === "w") {
                                counter1 === null || counter1 === void 0 ? void 0 : counter1.stop();
                                counter2 === null || counter2 === void 0 ? void 0 : counter2.resume();
                            }
                        }, 1000); // Using a longer interval to match timer update rate
                    }
                });
            }
        }
    });
});
