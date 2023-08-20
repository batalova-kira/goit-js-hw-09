import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import '../css/common.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  btnStart: document.querySelector('button[data-start]'),
  timeDays: document.querySelector('[data-days]'),
  timeHours: document.querySelector('[data-hours]'),
  timeMinutes: document.querySelector('[data-minutes]'),
  timeSeconds: document.querySelector('[data-seconds]')
};
let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = Number(selectedDates[0]);
    if (selectedDate < Date.now()) {
      Notify.failure("Please choose a date in the future");
      refs.btnStart.disabled = true;
    } else {
      refs.btnStart.disabled = false;
    }
  },
};

let calendar = flatpickr('#datetime-picker', options);

const timer = {
  isActive: false,
  intervalID: null,
  
  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    this.intervalID = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = selectedDate - currentTime;
      if (deltaTime <= 0) {
        this.stop();
        return;
      }
      const timeRemaining = convertMs(deltaTime);
      updateTimerDisplay(timeRemaining.days, timeRemaining.hours, timeRemaining.minutes, timeRemaining.seconds);
    }, 1000);
  },
  stop() {
    clearInterval(this.intervalID);
    this.intervalID = null;
    this.isActive = false;
    refs.btnStart.disabled = false;
  }
};

refs.btnStart.disabled = true;

refs.btnStart.addEventListener('click', () => {
  timer.start();
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}

function updateTimerDisplay(days, hours, minutes, seconds) {
  refs.timeDays.textContent = days;
  refs.timeHours.textContent = hours;
  refs.timeMinutes.textContent = minutes;
  refs.timeSeconds.textContent = seconds;
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}