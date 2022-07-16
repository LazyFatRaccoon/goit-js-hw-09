const btnStart = document.querySelector('button[data-start]')
const btnStop = document.querySelector('button[data-stop]')
const body = document.querySelector('body')

const DELAY = 1000;
let intervalId;


btnStart.addEventListener('click', onClick)
btnStop.addEventListener('click', onClick)

function onClick(e) {
    btnStart.toggleAttribute('disabled')
    btnStop.toggleAttribute('disabled')
    console.log(`clicked ${e.currentTarget.textContent}`)
    toggleInterval()
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

function toggleInterval() { 
    if (!intervalId) 
        {intervalId = setInterval(function() {body.style.backgroundColor = getRandomHexColor()}, DELAY)} 
    else
        {clearInterval(intervalId)
        intervalId=null}

}
    