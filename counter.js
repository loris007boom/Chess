"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
const createCounter = (elementId, timeLeft) => {
    const counterElement = document.getElementById(elementId);
    if (!counterElement) {
        console.error(`Element mit ID '${elementId}' nicht gefunden.`);
        return null;
    }
    let timerId = null;
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
        timerId = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            }
            else {
                clearInterval(timerId);
                counterElement.textContent = "Zeit abgelaufen!";
                running = false;
            }
        }, 1000);
    };
    updateDisplay();
    return {
        start: startTimer,
        stop: () => {
            if (timerId) {
                clearInterval(timerId);
                timerId = null;
                running = false;
            }
        },
        resume: startTimer,
    };
};
let selectedTime = null;
let counter1 = null;
let counter2 = null;
let currentTurn = document.getElementById("currentTurn");
document.querySelectorAll('.TimeButtons').forEach((button) => {
    button.addEventListener('click', function () {
        selectedTime = parseInt(this.value, 10); // Wert des Buttons (Minuten) wird als Zahl gespeichert
        if (selectedTime !== null) {
            const timeLeft = selectedTime * 60; // Umwandlung der Minuten in Sekunden
            counter1 === null || counter1 === void 0 ? void 0 : counter1.stop();
            counter2 === null || counter2 === void 0 ? void 0 : counter2.stop();
            counter1 = createCounter("counter1", timeLeft);
            counter2 = createCounter("counter2", timeLeft);
            if ((currentTurn === null || currentTurn === void 0 ? void 0 : currentTurn.textContent) === "b") {
                counter1 === null || counter1 === void 0 ? void 0 : counter1.start();
                counter2 === null || counter2 === void 0 ? void 0 : counter2.stop();
            }
            else if ((currentTurn === null || currentTurn === void 0 ? void 0 : currentTurn.textContent) === "w") {
                counter1 === null || counter1 === void 0 ? void 0 : counter1.stop();
                counter2 === null || counter2 === void 0 ? void 0 : counter2.start();
            }
        }
    });
});
let isPaused = false;
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield delay(1000);
    if ((currentTurn === null || currentTurn === void 0 ? void 0 : currentTurn.textContent) === "b") {
        counter1.start();
        counter2.stop();
    }
    else if ((currentTurn === null || currentTurn === void 0 ? void 0 : currentTurn.textContent) === "w") {
        counter1.stop();
        counter2.start();
    }
    const pauseButton = document.getElementById("pauseAll");
    if (pauseButton) {
        pauseButton.textContent = "Start";
        pauseButton.addEventListener("click", () => {
            if (!counter1 || !counter2)
                return;
            if (isPaused) {
                counter1.resume();
                counter2.stop();
            }
            else {
                counter1.stop();
                counter2.stop();
            }
            isPaused = !isPaused;
        });
    }
}))();
