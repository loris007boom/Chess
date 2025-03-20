import { getCurrentTurn } from './drag-drop.js';
import { showWinnerPopup } from './winningScreen.js';
import { createBoard } from './board.js';
import {Piece}  from './Piece.js'

let intervalID: number;



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

let selectedTime: number | null = null;
let timeLeft: number;
let counter1: ReturnType<typeof createCounter> | null = null;
let counter2: ReturnType<typeof createCounter> | null = null;

document.querySelectorAll<HTMLButtonElement>('.TimeButtons').forEach((button) => {
  button.addEventListener('click', function () {
    pauseButton.style.display = "block";
    selectedTime = parseInt(this.value, 10);

    if (selectedTime !== null) {
      timeLeft = selectedTime * 60;

      counter1 = createCounter("counter1", timeLeft);
      counter2 = createCounter("counter2", timeLeft);

      counter1?.stop();
      counter2?.stop();
    }
  });
});

      const pauseButton = document.getElementById("pauseAll") as HTMLButtonElement;
      const TimeButtonContainer = document.getElementById('TimeButtonContainer') as HTMLDialogElement;
      const surrenderButton = document.getElementById("surrenderButton") as HTMLButtonElement;
      let hasGameEnded : boolean = false;

      if (pauseButton) {
        pauseButton.addEventListener("click", () => {
          createBoard();
          surrenderButton.style.display = "block";
          pauseButton.style.display = "none";
          TimeButtonContainer.style.display = "none";
          const winColor = getCurrentTurn() === "w" ? "b" : "w";
            intervalID = setInterval(function () {
                if (surrenderButton) {
                    surrenderButton.addEventListener("click", () => {
                        showWinnerPopup(winColor);
                        hasGameEnded = true;
                    });
                } 
                if (Piece.isCheckmate(winColor))
                  {
                      hasGameEnded = true;
                  }
                  
                if (hasGameEnded){
                       clearInterval(intervalID);
                      counter1?.stop();
                      counter2?.stop();
                      return;
                } else if (getCurrentTurn() === "b") {
                    counter1?.resume();
                    counter2?.stop();
                } else if (getCurrentTurn() === "w") {
                    counter1?.stop();
                    counter2?.resume();
                }
            }, 1);
        });
    }