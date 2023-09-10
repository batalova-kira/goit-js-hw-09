import '../css/common.css';

let timerId;
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
console.log(btnStop);
btnStart.addEventListener ("click", () => {
  timerId = setInterval(() => {
      handlerSwitchBcgr();
  }, 1000);
});
btnStop.addEventListener('click', handlerStop);

function handlerSwitchBcgr() {
    btnStart.disabled = true;
    btnStop.disabled = false;
    document.body.style.background = getRandomHexColor();
}

function handlerStop() {
    clearInterval(timerId);
    btnStart.disabled = false;
    btnStop.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}