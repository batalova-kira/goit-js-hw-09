import '../css/common.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector(".form");

form.addEventListener('submit', hadlerSubmit);

function hadlerSubmit(e) {
  e.preventDefault();
  let delay = Number(form.delay.value);
  const step = Number(form.step.value);
  const amount = Number(form.amount.value);
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay);
    delay += step;
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(
      () => {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay)
  });
  
  promise.then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    })
};