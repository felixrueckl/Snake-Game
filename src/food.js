export class Food {
  constructor(width, height, gridSize) {
    this.width = width;
    this.height = height;
    this.gridSize = gridSize;
    this.position = { x: 0, y: 0 };
  }

  randomize(snake) {
    // Get all possible positions
    const availablePositions = [];
    
    for (let x = 0; x < this.width; x += this.gridSize) {
      for (let y = 0; y < this.height; y += this.gridSize) {
        // Check if this position is occupied by the snake
        const isOccupied = snake.segments.some(segment => 
          segment.x === x && segment.y === y
        );
        
        if (!isOccupied) {
          availablePositions.push({ x, y });
        }
      }
    }
    
    // Randomly select one of the available positions
    if (availablePositions.length > 0) {
      const randomIndex = Math.floor(Math.random() * availablePositions.length);
      this.position = availablePositions[randomIndex];
    }
  }

  draw(ctx) {
    ctx.fillStyle = '#ff4444';
    ctx.beginPath();
    ctx.arc(
      this.position.x + this.gridSize / 2,
      this.position.y + this.gridSize / 2,
      this.gridSize / 2 - 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
}
