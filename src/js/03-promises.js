import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const delay = form.querySelector('input[name="delay"]');
const step = form.querySelector('input[name="step"]');
const amount = form.querySelector('input[name="amount"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
    setTimeout(() => resolve({position, delay}), delay);
     } else {
    setTimeout(() => reject({position, delay}), delay);
  }
  })
  
}
    

form.addEventListener('submit', onSubmit)

function onSubmit(e) {
  e.preventDefault();
  const promiseArr = [];
  for (let i=0;i<Number(amount.value);i++) {
    createPromise(i+1, Number(step.value)*(i)+Number(delay.value))
    .then(({position, delay}) => Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`))
    .catch(({position, delay}) => Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`))
  }
}
