const btnStart = document.getElementById('start');
const fieldGame = document.getElementById('game');
const timer = document.getElementById('time');
const resultHeader = document.getElementById('result-header');
const result = document.getElementById('result');
const gameTime = document.getElementById('game-time');

const colors = ['red', 'green', 'blue', 'pink', 'yellow'];

let counterBox = 0;
let defaultGame = false;

btnStart.addEventListener('click', startGame);
gameTime.addEventListener('input', startGameTime);

function startGame() {
	defaultGame = true;
	counterBox = 0;
	startGameTime();
	gameTime.setAttribute('disabled', 'true');
	btnStart.classList.add('hide');
	fieldGame.style.background = '#fff';
	renderBox();
	const interval = setInterval(function () {
		let time = parseFloat(timer.innerText);
		if (time <= 0) {
			clearInterval(interval);
			stopGame();
		} else {
			timer.innerText = (time - 0.1).toFixed(2);
		}
	}, 100);
}

function renderBox() {
	fieldGame.innerHTML = '';
	const box = document.createElement('div');
	const boxSize = getRandom(10, 150);
	const interactiveField = fieldGame.getBoundingClientRect();
	const maxHeight = interactiveField.height - boxSize;
	const maxWidth = interactiveField.width - boxSize;
	box.style.height = box.style.width = boxSize + 'px';
	box.style.position = 'absolute';
	box.style.top = getRandom(0, maxHeight) + 'px';
	box.style.left = getRandom(0, maxWidth) + 'px';
	box.style.backgroundColor = colors[getRandom(0, colors.length)];
	fieldGame.insertAdjacentElement('afterbegin', box);
	box.addEventListener('click', handleBox);
}

function handleBox() {
	if (defaultGame) {
		counterBox++;
		renderBox();
	}
}

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function stopGame() {
	defaultGame = false;
	btnStart.classList.remove('hide');
	fieldGame.style.background = 'linear-gradient(#606c88, #3f4c6b)';
	fieldGame.innerHTML = '';
	resultHeader.classList.remove('hide');
	resultHeader.previousElementSibling.classList.add('hide');
	result.innerText = counterBox;
	gameTime.removeAttribute('disabled');
}

function startGameTime() {
	let time = +gameTime.value;
	timer.innerText = time.toFixed(2);
	resultHeader.classList.add('hide');
	resultHeader.previousElementSibling.classList.remove('hide');
}


