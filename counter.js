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
    updateDisplay();
    return {
        stop: () => {
            if (timer) {
                clearInterval(timer);
                timer = null;
                running = false;
            }
        },
        resume: startTimer,
    };
};
// Get user input safely
let timeLeftInput = prompt("Wie viele Minuten wollt ihr spielen?", "20");
let timeLeft = timeLeftInput ? parseInt(timeLeftInput) * 60 : 1200;
if (isNaN(timeLeft) || timeLeft <= 0 || timeLeft > 30 * 60) {
    alert("Ungültige Eingabe!");
}
else {
    const counter1 = createCounter("counter1", timeLeft);
    const counter2 = createCounter("counter2", timeLeft);
    if (!counter1 || !counter2) {
        console.error("Timer konnten nicht initialisiert werden.");
    }
    counter1 === null || counter1 === void 0 ? void 0 : counter1.stop();
    counter2 === null || counter2 === void 0 ? void 0 : counter2.stop();
    let isPaused = false;
    const pauseButton = document.getElementById("pauseAll");
    if (pauseButton) {
        pauseButton.textContent = "Start";
        pauseButton.addEventListener("click", () => {
            isPaused = true;
            if (isPaused) {
                setInterval(function () {
                    if (getCurrentTurn() === "b") {
                        counter1 === null || counter1 === void 0 ? void 0 : counter1.resume();
                        counter2 === null || counter2 === void 0 ? void 0 : counter2.stop();
                    }
                    else if (getCurrentTurn() === "w") {
                        counter1 === null || counter1 === void 0 ? void 0 : counter1.stop();
                        counter2 === null || counter2 === void 0 ? void 0 : counter2.resume();
                    }
                    else
                        return;
                }, 10);
            }
        });
    }
}
const bullet = document.getElementById("bullet");
const blitz = document.getElementById("Blitz");
const normal = document.getElementById("Normal");
console.log(bullet.value, blitz.value, normal.value);
function getValue() { }
// bullet?.addEventListener("click", () => onClick(bullet.value));
// blitz?.addEventListener("click", () => onClick(blitz.value));
// normal?.addEventListener("click", () => onClick(normal.value));
