const datetimeInput = document.getElementById("datetime") as HTMLInputElement;
const startBtn = document.getElementById("startBtn") as HTMLButtonElement;
const pauseBtn = document.getElementById("pauseBtn") as HTMLButtonElement;
const resetBtn = document.getElementById("resetBtn") as HTMLButtonElement;
const countdownDisplay = document.getElementById("countdown") as HTMLElement;

let countdownInterval: number | undefined;
let targetTime: number | null = null;
let paused = false;
let remainingTime: number = 0;

function updateCountdown() {
  if (!targetTime) return;

  const now = new Date().getTime();
  const distance = targetTime - now;

  if (distance <= 0) {
    clearInterval(countdownInterval);
    countdownDisplay.textContent = "🎉 Time's up!";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownDisplay.textContent = `${pad(days)}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
}

function pad(num: number): string {
  return num.toString().padStart(2, '0');
}

startBtn.addEventListener("click", () => {
  const dateValue = datetimeInput.value;
  if (!dateValue) return;

  const selectedTime = new Date(dateValue).getTime();

  if (paused && remainingTime) {
    targetTime = new Date().getTime() + remainingTime;
  } else {
    targetTime = selectedTime;
  }

  paused = false;

  clearInterval(countdownInterval);
  countdownInterval = setInterval(updateCountdown, 1000);
  updateCountdown();
});

pauseBtn.addEventListener("click", () => {
  if (!targetTime) return;

  paused = true;
  clearInterval(countdownInterval);
  remainingTime = targetTime - new Date().getTime();
});

resetBtn.addEventListener("click", () => {
  clearInterval(countdownInterval);
  countdownDisplay.textContent = "00d 00h 00m 00s";
  datetimeInput.value = "";
  targetTime = null;
  remainingTime = 0;
  paused = false;
});
