const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
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

const bullet = document.getElementById("bullet") as HTMLButtonElement;
const blitz = document.getElementById("Blitz") as HTMLButtonElement;
const normal = document.getElementById("Normal") as HTMLButtonElement;
console.log(bullet.value, blitz.value, normal.value);
let timeLeftInput: number = 0;

function getValue() {}
// bullet?.addEventListener("click", () => onClick(bullet.value));
// blitz?.addEventListener("click", () => onClick(blitz.value));
// normal?.addEventListener("click", () => onClick(normal.value));
let timeLeft = timeLeftInput * 60;

const counter1 = createCounter("counter1", timeLeft);
const counter2 = createCounter("counter2", timeLeft);
let currentTurn = document.getElementById("currentTurn");

counter1?.stop();
counter2?.stop();

let isPaused = false;

(async () => {
  await delay(1000);

  if (currentTurn?.textContent === "b") {
    counter1?.resume();
    counter2?.stop();
  } else if (currentTurn?.textContent === "w") {
    counter1?.stop();
    counter2?.resume();
  }

  const pauseButton = document.getElementById("pauseAll") as HTMLButtonElement;
  if (pauseButton) {
    pauseButton.textContent = "Start";
    pauseButton.addEventListener("click", () => {
      if (!counter1 || !counter2) return;

      if (isPaused) {
        counter1.resume();
        counter2.stop();
      }
      isPaused = !isPaused;
    });
  }
})();
