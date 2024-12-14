export class Snake {
  constructor(gridSize) {
    this.gridSize = gridSize;
    this.segments = [
      { x: 5 * gridSize, y: 5 * gridSize }
    ];
    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };
    this.growing = false;
  }

  move() {
    this.direction = { ...this.nextDirection };
    const head = this.segments[0];
    const newHead = {
      x: head.x + this.direction.x * this.gridSize,
      y: head.y + this.direction.y * this.gridSize
    };

    // Wrap around the screen
    if (newHead.x < 0) newHead.x = 400 - this.gridSize;
    if (newHead.x >= 400) newHead.x = 0;
    if (newHead.y < 0) newHead.y = 400 - this.gridSize;
    if (newHead.y >= 400) newHead.y = 0;

    this.segments.unshift(newHead);
    if (!this.growing) {
      this.segments.pop();
    }
    this.growing = false;
  }

  grow() {
    this.growing = true;
  }

  draw(ctx) {
    ctx.fillStyle = '#4CAF50';
    this.segments.forEach((segment, index) => {
      if (index === 0) {
        ctx.fillStyle = '#45a049'; // Darker green for head
      } else {
        ctx.fillStyle = '#4CAF50';
      }
      ctx.fillRect(segment.x, segment.y, this.gridSize - 2, this.gridSize - 2);
    });
  }

  handleInput(e) {
    switch (e.key) {
      case 'ArrowUp':
        if (this.direction.y === 0) this.nextDirection = { x: 0, y: -1 };
        break;
      case 'ArrowDown':
        if (this.direction.y === 0) this.nextDirection = { x: 0, y: 1 };
        break;
      case 'ArrowLeft':
        if (this.direction.x === 0) this.nextDirection = { x: -1, y: 0 };
        break;
      case 'ArrowRight':
        if (this.direction.x === 0) this.nextDirection = { x: 1, y: 0 };
        break;
    }
  }

  checkWallCollision() {
    return false; // Disable wall collision since we're wrapping
  }

  checkSelfCollision() {
    const head = this.segments[0];
    return this.segments.slice(1).some(segment => 
      segment.x === head.x && segment.y === head.y
    );
  }

  checkFoodCollision(food) {
    const head = this.segments[0];
    return head.x === food.position.x && head.y === food.position.y;
  }
}
