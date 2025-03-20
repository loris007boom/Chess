import { getCurrentTurn } from './drag-drop.js';
import { showWinnerPopup } from './winningScreen.js';


const createCounter = (elementId: string, timeLeft: number) => {
  const counterElement = document.getElementById(elementId);
  if (!counterElement) {
    console.error(`Element mit ID '${elementId}' nicht gefunden.`);
    return null;
  }

  let timer: number | null = null;
  let running: boolean = false;

  const updateDisplay = () => {
    const minutes: number = Math.floor(timeLeft / 60);
    const seconds: number = timeLeft % 60;
    counterElement.textContent = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const startTimer = () => {
    if (running) return;
    running = true;
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        const winColor = getCurrentTurn() === "w" ? "b" : "w";
        showWinnerPopup(winColor);
      }
    }, 1000);
  };
  
  const surrenderButton = document.getElementById("surrenderButton") as HTMLButtonElement;

if (surrenderButton) {
  surrenderButton.addEventListener("click", () => {
    const winColor = getCurrentTurn() === "w" ? "b" : "w";
    showWinnerPopup(winColor);
  });
}

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
  const whichPlayerTurnElement = document.getElementById('whichPlayerTurn') as HTMLParagraphElement;
  const currentTurn = getCurrentTurn();
  whichPlayerTurnElement.textContent = currentTurn === "w" ? "White's turn" : "Black's turn";
}

let selectedTime: number | null = null;
let timeLeft: number;
let counter1: ReturnType<typeof createCounter> | null = null;
let counter2: ReturnType<typeof createCounter> | null = null;

document.querySelectorAll<HTMLButtonElement>('.TimeButtons').forEach((button) => {
  button.addEventListener('click', function () {
    selectedTime = parseInt(this.value, 10);

    if (selectedTime !== null) {
      timeLeft = selectedTime * 60;

      counter1 = createCounter("counter1", timeLeft);
      counter2 = createCounter("counter2", timeLeft);

      counter1?.stop();
      counter2?.stop();

      const pauseButton = document.getElementById("pauseAll") as HTMLButtonElement;
      const TimeButtonContainer = document.getElementById('TimeButtonContainer') as HTMLDialogElement;

      if (pauseButton) {
        pauseButton.addEventListener("click", () => {

          TimeButtonContainer.remove();
          setInterval(function () {
            if (getCurrentTurn() === "b") {
              counter1?.resume();
              counter2?.stop();
            } else if (getCurrentTurn() === "w") {
              counter1?.stop();
              counter2?.resume();
            }
              updatePlayerTurn();
          }, 1000);
        });
      }
      
    }
  });
});
export { showWinnerPopup }
