// script.js
// for timer
let timer = null;
let minutes = 25;
let seconds = 0;
let isPaused = false;
let enteredTime = null;
let audio = new Audio("timer.mp3");
audio.preload = "auto";

const timerElement = document.getElementById("timer");
const pauseResumeButton = document.querySelector(".control-buttons button");

const btnPause = document.querySelector(".pause");
const btnPomodoro = document.querySelector(".pomodoro");
const btnShortBreak = document.querySelector(".shortBreak");
const btnLongBreak = document.querySelector(".longBreak");

const changeColor = function (bodyC, mainC) {
  document.querySelector("body").style.backgroundColor = `${bodyC}`;
  document.querySelector(".main").style.backgroundColor = `${mainC}`;
};

const startTimer = function () {
  //   timer = setInterval(updateTimer, 1000);
  if (!timer) {
    timer = setInterval(updateTimer, 1000);
  }
};

// const updateTimer = function () {
//   timerElement.textContent = formatTime(minutes, seconds);
//   if (minutes === 0 && seconds === 0) {
//     audio.play();
//     pomodoro();
//     // chooseTime();
//   } else if (!isPaused) {
//     if (seconds > 0) {
//       --seconds;
//     } else {
//       seconds = 59;
//       minutes--;
//     }
//   }
// };
const pomodoro = function () {
  document.querySelector(".h1").textContent = `Pomodoro Mode`;
  minutes = chooseTime();
  changeColor("#79b425", "#c0de7b");
  //   changeColor("#fd5602", "#fe6e00");
  restartTimer(minutes);
};

const updateTimer = function () {
  if (!isPaused) {
    if (minutes === 0 && seconds === 0) {
      audio.play();
      // setTimeout(pomodoro, 10);
      return;
    }

    if (seconds > 0) {
      --seconds;
    } else if (minutes > 0) {
      seconds = 59;
      --minutes;
    }
  }
  timerElement.textContent = formatTime(minutes, seconds);
};

const chooseTime = function () {
  const enteredTime = prompt("Enter time in minutes");
  minutes = parseInt(enteredTime);
  if (!isNaN(minutes) && minutes > 0) {
    return minutes;
  } else {
    alert("Please enter valid time");
    return;
  }
};

function formatTime(minutes, seconds) {
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}

function togglePauseResume() {
  isPaused = !isPaused;
  if (isPaused) {
    clearInterval(timer);
    timer = null;
    pauseResumeButton.textContent = "Resume";
  } else {
    startTimer();
    pauseResumeButton.textContent = "Pause";
  }
}

function restartTimer(min) {
  clearInterval(timer);
  timer = null;
  minutes = min;
  seconds = 0;
  isPaused = false;
  timerElement.textContent = formatTime(minutes, seconds);
  // pauseResumeButton.textContent = "Pause";
  startTimer();
}

btnPause.addEventListener("click", function () {
  console.log("clicked");
  togglePauseResume();
});

btnPomodoro.addEventListener("click", function () {
  pomodoro();
});

btnShortBreak.addEventListener("click", function () {
  document.querySelector(".h1").textContent = "Short Break Mode";
  changeColor("#519dc4", "#87d2f8");
  restartTimer(5);
});

btnLongBreak.addEventListener("click", function () {
  document.querySelector(".h1").textContent = "Long Break Mode";
  changeColor("#924dbf", "#9e72c3");
  restartTimer(10);
});

startTimer();
