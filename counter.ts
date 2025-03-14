import { getCurrentTurn } from './drag-drop.js';
const createCounter = (elementId: string, timeLeft: number) => {
  const counterElement = document.getElementById(elementId);
  if (!counterElement) {
    console.error(`Element mit ID '${elementId}' nicht gefunden.`);
    return null;
  }

  let timer: number | null = null;
  let running = false;

  const updateDisplay = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    counterElement.textContent = `${minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  const startTimer = () => {
    if (running) return;
    running = true;
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timer!);
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

let timeLeftInput: string | null = prompt("Wie viele Minuten wollt ihr spielen?", "20");
let timeLeft = timeLeftInput ? parseInt(timeLeftInput) * 60 : 1200;

if (isNaN(timeLeft) || timeLeft <= 0 || timeLeft > 30 * 60) {
    alert("Ungültige Eingabe!");
} else {
    const counter1 = createCounter("counter1", timeLeft);
    const counter2 = createCounter("counter2", timeLeft);

    if (!counter1 || !counter2) {
        console.error("Timer konnten nicht initialisiert werden.");
    }

    counter1?.stop();
    counter2?.stop();

let isPaused = false;
 
const pauseButton = document.getElementById("pauseAll") as HTMLButtonElement;
  if (pauseButton) {
    pauseButton.textContent = "Start";
    pauseButton.addEventListener("click", () => {

        isPaused = true;
        if (isPaused) {
        setInterval(function () {
            if (getCurrentTurn() === "b") {
                counter1?.resume();
                counter2?.stop();
            } else if (getCurrentTurn() === "w") {
                counter1?.stop();
                counter2?.resume();
            } else
            return;
          }, 10);
      }
    });
  }
}
const bullet = document.getElementById("bullet") as HTMLButtonElement;
const blitz = document.getElementById("Blitz") as HTMLButtonElement;
const normal = document.getElementById("Normal") as HTMLButtonElement;
console.log(bullet.value, blitz.value, normal.value);

function getValue() {}
// bullet?.addEventListener("click", () => onClick(bullet.value));
// blitz?.addEventListener("click", () => onClick(blitz.value));
// normal?.addEventListener("click", () => onClick(normal.value));
