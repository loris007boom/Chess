const delay = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const createCounter = (elementId: string, timeLeft: number) => {
    const counterElement = document.getElementById(elementId);
    if (!counterElement) {
        console.error(`Element mit ID '${elementId}' nicht gefunden.`);
        return null;
    }

    let timer: number | null = null;
    let running: boolean = false;

    const updateDisplay = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
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
        resume: startTimer
    };
};

let timeLeftInput: string = prompt("Wie viele Minuten wollt ihr spielen?", "") || "20";
let timeLeft = parseInt(timeLeftInput) * 60;

if (isNaN(timeLeft) || timeLeft <= 0 || timeLeft >= 30 * 60) {
    alert("Ungültige Eingabe!");
} else {
    const counter1 = createCounter("counter1", timeLeft);
    const counter2 = createCounter("counter2", timeLeft);
    let currentTurn = document.getElementById("currentTurn");

    counter1?.stop();
    counter2?.stop();

    let isPaused = false;

    const pauseButton = document.getElementById("pauseAll") as HTMLButtonElement;
    if (pauseButton) {
        pauseButton.textContent = "switch";
        pauseButton.addEventListener("click", () => {
            if (!counter1 || !counter2) return;

            if (isPaused) {
                counter1.resume();
                counter2.stop();
            } else {
                counter1.stop();
                counter2.resume();
            }
            isPaused = !isPaused;
        });
    }
}