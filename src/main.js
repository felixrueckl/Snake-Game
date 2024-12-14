import { Game } from './game.js';
import { Snake } from './snake.js';
import { Food } from './food.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
const scoreElement = document.getElementById('score');

canvas.width = 400;
canvas.height = 400;

const game = new Game(canvas, ctx, scoreElement);

startBtn.addEventListener('click', () => {
  game.start();
  startBtn.blur();
});

document.addEventListener('keydown', (e) => {
  game.handleInput(e);
});
