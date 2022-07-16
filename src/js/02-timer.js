import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import swal from 'sweetalert';

const btnStart = document.querySelector('button[data-start]')
const timerDisplay = document.querySelectorAll('.field .value')
let indervalId = null;
let pickDateInMs;
const DELAY = 1000;

console.log(1)
console.log(Array.from(timerDisplay)) 

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      pickDateInMs = +selectedDates[0];
      if (+Date.now() > pickDateInMs) 
      {
        swal("Please choose a date in the future",{
            className: "tomato-bg",
          })
        btnStart.setAttribute('disabled', true)
        
      }
      else 
      {
        btnStart.removeAttribute('disabled')
      }
    },
  };

flatpickr('#datetime-picker', options)


btnStart.addEventListener('click', onClick)

function onClick() {
    btnStart.setAttribute('disabled', true)
    indervalId = setInterval (function() {
        let time = convertMs(pickDateInMs - +Date.now())
        if (pickDateInMs - +Date.now() <= 0) {
            Array.from(timerDisplay).forEach(el=>el.textContent='🦝')
            clearInterval(indervalId)
        } else refresh(time);
    },DELAY)
    
}

function refresh({days, hours, minutes, seconds}) {
    timerDisplay[0].textContent = days; 
    timerDisplay[1].textContent = addLeadingZero(hours);
    timerDisplay[2].textContent = addLeadingZero(minutes);
    timerDisplay[3].textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

function addLeadingZero(value) {
    return value.toString().padStart(2,'0')
}