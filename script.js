const startBtn = document.querySelector('.start-btn');
const screens = document.querySelectorAll('.screen');
const timeListEl = document.querySelector('#time-list');
const timeLeftEl = document.querySelector('#time');
const boardEl = document.querySelector('#board');

const welcomScreen = screens[0];
const gameScreen = screens[1];
const resultScreen = screens[2];
const colorList = ['#d9303b', '#cc239c', '#2c3fe8', '#2cc6e8', '#2ce89a', '#2cb02a', '#cce339', '#e3be39', '#e37739',  '#e34d39'];

let timeRemains = null;
let score = 0;

function decrementTime() {
  let currentTime =  timeRemains -= 1;
  if (currentTime === 0) {
    finishGame()
  }
  if (currentTime < 10) {
    currentTime = `0${currentTime}`;
  }
  setTime(currentTime);
}

function setTime(value) {
  timeLeftEl.textContent = `00:${value}`;
}

function startGame() {
  setInterval(decrementTime, 1000);
  createRandomCircle();
  setTime(timeRemains);
}

function finishGame() {
  timeLeftEl.parentNode.classList.add('hide');
  boardEl.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`;
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function createRandomCircle() {
  const circle = document.createElement('div');
  const circleSize = getRandomNumber(5, 60);
  const circleColor = colorList[getRandomNumber(0, 9)]

  const { width, height } = boardEl.getBoundingClientRect();
  const x = getRandomNumber(0, width - circleSize);
  const y = getRandomNumber(0, height - circleSize);

  circle.classList.add('circle');
  circle.style.width = `${circleSize}px`;
  circle.style.height = `${circleSize}px`;
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
  circle.style.background = `${circleColor}`

  boardEl.append(circle);
}

boardEl.addEventListener('click', (e) => {
  if (e.target.classList.contains('circle')) {
    score += 1;
    e.target.remove();
    createRandomCircle();
  }
});

startBtn.addEventListener('click', (e) => {
  e.preventDefault();
  welcomScreen.classList.add('up');
});

timeListEl.addEventListener('click', (e) => {
  const { target } = e;
  if (target.classList.contains('time-btn')) {
    timeRemains = parseInt(target.getAttribute('data-time'));
    gameScreen.classList.add('up');
    startGame();
  }
});
