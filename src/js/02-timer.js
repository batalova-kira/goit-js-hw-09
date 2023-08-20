import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import '../css/common.css';

const refs = {
  btnStart: document.querySelector('button[data-start]'),
  timeDays: document.querySelector('[data-days]'),
  timeHours: document.querySelector('[data-hours]'),
  timeMinutes: document.querySelector('[data-minutes]'),
  timeSeconds: document.querySelector('[data-seconds]')
}
let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = Number(selectedDates[0]);
    console.log(selectedDate);
    // if (selectedDate < 0) {
    //   window.alert("Please choose a date in the future");
    // } else{
    
    // }
  },
};
 
refs.btnStart.addEventListener('click', () => {timer.start()});

let calendar = flatpickr('#datetime-picker', options);

const timer = {
  isActive: false,
  start() {
  if (this.isActive) {
    return;
    }
    this.isActive = true, 
    setInterval(() => {
      refs.btnStart.disabled = true;
      const currentTime = Date.now();
      const deltaTime = selectedDate - currentTime;
      convertMs(deltaTime);
      refs.timeDays.textContent = convertMs(deltaTime).days;
      refs.timeHours.textContent = convertMs(deltaTime).hours;
      refs.timeMinutes.textContent = convertMs(deltaTime).minutes;
      refs.timeSeconds.textContent = convertMs(deltaTime).seconds;
    }, 1000);
  }
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}