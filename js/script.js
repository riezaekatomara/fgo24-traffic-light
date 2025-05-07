const redLight = document.getElementById("redLight");
const yellowLight = document.getElementById("yellowLight");
const greenLight = document.getElementById("greenLight");
const startButton = document.getElementById("startButton");

let isRunning = false;

function resetLights() {
  redLight.className = "light";
  yellowLight.className = "light";
  greenLight.className = "light";
}

function turnOnRed() {
  resetLights();
  redLight.className = "light active-red";
}

function turnOnYellow() {
  resetLights();
  yellowLight.className = "light active-yellow";
}

function turnOnGreen() {
  resetLights();
  greenLight.className = "light active-green";
}

function startTrafficLightCycle() {
  if (isRunning) return;

  isRunning = true;
  startButton.textContent = "Siklus Berjalan";

  function runCycle() {
    turnOnRed();

    setTimeout(function () {
      turnOnYellow();

      setTimeout(function () {
        turnOnGreen();

        setTimeout(function () {
          runCycle();
        }, 3000);
      }, 2000);
    }, 3000);
  }

  runCycle();
}

startButton.addEventListener("click", startTrafficLightCycle);

turnOnRed();
