type timer = {
  start: () => void,
  stop: () => void,
  resume: () => void
};

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const createCounter = (elementId: string, timeLeft: number): timer | null => {
  const counterElement = document.getElementById(elementId);
  if (!counterElement) {
    console.error(`Element mit ID '${elementId}' nicht gefunden.`);
    return null;
  }

  let timerId: number | null = null;
  let running = false;

  const updateDisplay = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    counterElement.textContent = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const startTimer = () => {
    if (running) return;
    running = true;
    timerId = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timerId!);
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

let selectedTime: number | null = null;
let counter1: timer | null = null;
let counter2: timer | null = null;
let currentTurn = document.getElementById("currentTurn");

document.querySelectorAll<HTMLButtonElement>('.TimeButtons').forEach((button) => {
  button.addEventListener('click', function () {
    selectedTime = parseInt(this.value, 10); // Wert des Buttons (Minuten) wird als Zahl gespeichert

    if (selectedTime !== null) {
      const timeLeft = selectedTime * 60; // Umwandlung der Minuten in Sekunden

      counter1?.stop();
      counter2?.stop();

      counter1 = createCounter("counter1", timeLeft);
      counter2 = createCounter("counter2", timeLeft);

      if (currentTurn?.textContent === "b") {
        counter1?.start();
        counter2?.stop();
      } else if (currentTurn?.textContent === "w") {
        counter1?.stop();
        counter2?.start();
      }
    }
  });
});

let isPaused = false;

(async () => {
  await delay(1000);

  if (currentTurn?.textContent === "b") {
    counter1!.start();
    counter2!.stop();
  } else if (currentTurn?.textContent === "w") {
    counter1!.stop();
    counter2!.start();
  }

  const pauseButton = document.getElementById("pauseAll") as HTMLButtonElement;
  if (pauseButton) {
    pauseButton.textContent = "Start";
    pauseButton.addEventListener("click", () => {
      if (!counter1 || !counter2) return;

      if (isPaused) {
        counter1.resume();
        counter2.stop();
      } else {
        counter1.stop();
        counter2.stop();
      }
      isPaused = !isPaused;
    });
  }
})();