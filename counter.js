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
    startTimer();
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
const bullet = document.getElementById("bullet");
const blitz = document.getElementById("Blitz");
const normal = document.getElementById("Normal");
console.log(bullet.value, blitz.value, normal.value);
let timeLeftInput = 0;
const onClick = (value) => {
    timeLeftInput = parseInt(value);
};
let timeLeft = timeLeftInput * 60;
const counter1 = createCounter("counter1", timeLeft);
const counter2 = createCounter("counter2", timeLeft);
let currentTurn = document.getElementById("currentTurn");
counter1 === null || counter1 === void 0 ? void 0 : counter1.stop();
counter2 === null || counter2 === void 0 ? void 0 : counter2.stop();
let isPaused = false;
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield delay(1000);
    if ((currentTurn === null || currentTurn === void 0 ? void 0 : currentTurn.textContent) === "b") {
        counter1 === null || counter1 === void 0 ? void 0 : counter1.resume();
        counter2 === null || counter2 === void 0 ? void 0 : counter2.stop();
    }
    else if ((currentTurn === null || currentTurn === void 0 ? void 0 : currentTurn.textContent) === "w") {
        counter1 === null || counter1 === void 0 ? void 0 : counter1.stop();
        counter2 === null || counter2 === void 0 ? void 0 : counter2.resume();
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
            isPaused = !isPaused;
        });
    }
    bullet.addEventListener("click", () => onClick(bullet.value));
    blitz.addEventListener("click", () => onClick(blitz.value));
    normal.addEventListener("click", () => onClick(normal.value));
}))();
