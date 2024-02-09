import Paddle from "./Paddle.js";

class ComputerPaddle extends Paddle {
  speed = 0.91; // 0-1, compare to ball x speed

  constructor(arenaSize, verticalLocation) {
    super(arenaSize, verticalLocation);
  };

  move(ballXLocation, arenaWidth, ballXSpeed) {
    const paddleCenter = (this.location.x + (this.size.width / 2));

    if (ballXSpeed <= 3) ballXSpeed = 3;

    // Move to left
    if (ballXLocation < paddleCenter) {
      this.location.x -= Math.round(ballXSpeed * this.speed);
    }

    // Move to right
    if (ballXLocation > paddleCenter) {
      this.location.x += Math.round(ballXSpeed * this.speed);
    }

    this.checkHorizontalBoundaries(arenaWidth);
  };
}

export default ComputerPaddle;