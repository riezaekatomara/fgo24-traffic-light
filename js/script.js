const redLight = document.querySelector(".light.red");
const yellowLight = document.querySelector(".light.yellow");
const greenLight = document.querySelector(".light.green");
const statusText = document.querySelector(".status");

let isRunning = false;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function turnOffAllLights() {
  redLight.classList.remove("active");
  yellowLight.classList.remove("active");
  greenLight.classList.remove("active");
}

function updateStatus(text) {
  statusText.textContent = `Status: ${text}`;
}

async function runTrafficCycle() {
  while (isRunning) {
    turnOffAllLights();
    redLight.classList.add("active");
    updateStatus("Berhenti");
    await wait(5000);

    if (!isRunning) break;

    turnOffAllLights();
    yellowLight.classList.add("active");
    updateStatus("Bersiap");
    await wait(2000);

    if (!isRunning) break;

    turnOffAllLights();
    greenLight.classList.add("active");
    updateStatus("Jalan");
    await wait(5000);

    if (!isRunning) break;

    turnOffAllLights();
    yellowLight.classList.add("active");
    updateStatus("Perlambat");
    await wait(2000);
  }
}

function startTrafficLight() {
  if (!isRunning) {
    isRunning = true;
    runTrafficCycle();
  }
}

function stopTrafficLight() {
  isRunning = false;
  turnOffAllLights();
  updateStatus("Mati");
}

window.onload = function () {
  redLight.classList.add("active");
};
