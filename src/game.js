import { Snake } from './snake.js';
import { Food } from './food.js';

export class Game {
  constructor(canvas, ctx, scoreElement) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.scoreElement = scoreElement;
    this.gridSize = 20;
    this.snake = new Snake(this.gridSize);
    this.food = new Food(canvas.width, canvas.height, this.gridSize);
    this.score = 0;
    this.gameLoop = null;
    this.speed = 150;
    this.maxScore = (canvas.width / this.gridSize) * (canvas.height / this.gridSize) - 1;
    
    this.gameOverElement = document.getElementById('gameOver');
    this.gameOverTitle = document.getElementById('gameOverTitle');
    this.gameOverMessage = document.getElementById('gameOverMessage');
    this.restartBtn = document.getElementById('restartBtn');
    
    this.restartBtn.addEventListener('click', () => {
      this.hideGameOver();
      this.start();
    });
  }

  start() {
    if (this.gameLoop) return;
    
    this.snake = new Snake(this.gridSize);
    this.food.randomize(this.snake);
    this.score = 0;
    this.scoreElement.textContent = '0';
    this.gameLoop = setInterval(() => this.update(), this.speed);
  }

  update() {
    this.snake.move();

    if (this.snake.checkSelfCollision()) {
      this.gameOver();
      return;
    }

    if (this.snake.checkFoodCollision(this.food)) {
      this.score += 10;
      this.scoreElement.textContent = this.score;
      this.snake.grow();
      
      if (this.score >= this.maxScore * 10) {
        this.victory();
        return;
      }
      
      this.food.randomize(this.snake);
    }

    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.snake.draw(this.ctx);
    this.food.draw(this.ctx);
  }

  showGameOver(title, message) {
    this.gameOverTitle.textContent = title;
    this.gameOverMessage.textContent = message;
    this.gameOverElement.style.display = 'block';
  }

  hideGameOver() {
    this.gameOverElement.style.display = 'none';
  }

  gameOver() {
    clearInterval(this.gameLoop);
    this.gameLoop = null;
    this.showGameOver(
      'Game Over!',
      `You hit your tail! Final score: ${this.score}`
    );
  }

  victory() {
    clearInterval(this.gameLoop);
    this.gameLoop = null;
    this.showGameOver(
      'Congratulations!',
      'You beat the game! You are a Snake Master!'
    );
  }

  handleInput(e) {
    this.snake.handleInput(e);
  }
}
