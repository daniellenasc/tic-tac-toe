class Chronometer {
    constructor() {
      this.currentTime = 0;
      this.intervalId = null;
    }
  
    start(callback) {
      this.intervalId = setInterval(() => {
        this.currentTime++;
        if (callback){
          callback();
        }
      }, 1000)
    }
  
    getMinutes() {
      return Math.floor(this.currentTime / 60);
    }
  
    getSeconds() {
      return this.currentTime % 60;
    }
  
    computeTwoDigitNumber(value) {
      if (value < 10) {
        return `0${value}`;
      }
      return `${value}`;
    }
  
    
    reset() {
      this.currentTime = 0;
    }
  
    
}






const chronometer = new Chronometer();
// get the buttons:
const startButton = document.getElementById('startButton');
const clock = document.getElementById ('clock')

// get the DOM elements that will serve us to display the time:
const minDecElement = document.getElementById('minDec');
const minUniElement = document.getElementById('minUni');
const secDecElement = document.getElementById('secDec');
const secUniElement = document.getElementById('secUni');

function printTime() {
    printMinutes();
    printSeconds();
}

function printMinutes() {
    const minuto = chronometer.getMinutes();    
    minDecElement.innerText = chronometer.computeTwoDigitNumber(minuto)[0];
    minUniElement.innerText = chronometer.computeTwoDigitNumber(minuto)[1];
}

function printSeconds() {
    const segundos = chronometer.getSeconds();    
    secDecElement.innerText = chronometer.computeTwoDigitNumber(segundos)[0];
    secUniElement.innerText = chronometer.computeTwoDigitNumber(segundos)[1];
}

startButton.addEventListener('click', () => {
    chronometer.start(printTime);
    startButton.classList.toggle('no-show');
    clock.classList.toggle('show')
});
