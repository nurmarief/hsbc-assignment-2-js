class Arena {
  /* 
    Size is how to decide how many x,y inside a certain area,
    not decided by its container size
  */
  size = {
    width: 500,
    height: 700,
  }

  position = {
    left: 0,
  };

  constructor(element) {
    this.element = element;
    // Set arena size
    this.element.width = this.size.width;
    this.element.height = this.size.height;
  };

  createArenaBackground(twoDimensionRenderingContext) {
    twoDimensionRenderingContext.fillStyle = getComputedStyle(this.element).getPropertyValue('--canvas-bg-color');
    twoDimensionRenderingContext.fillRect(0, 0, this.size.width, this.size.height);
  };

  createPaddle(twoDimensionRenderingContext, paddle) {
    twoDimensionRenderingContext.fillStyle = getComputedStyle(this.element).getPropertyValue('--paddle-color');
    twoDimensionRenderingContext.fillRect(paddle.location.x, paddle.location.y, paddle.size.width, paddle.size.height);
  }

  createCenterLine(twoDimensionRenderingContext) {
    twoDimensionRenderingContext.beginPath();
    twoDimensionRenderingContext.setLineDash([4]);
    twoDimensionRenderingContext.moveTo(0, (this.size.height / 2));
    twoDimensionRenderingContext.lineTo(this.size.width, (this.size.height / 2));
    twoDimensionRenderingContext.strokeStyle = getComputedStyle(this.element).getPropertyValue('--middle-line-color');
    twoDimensionRenderingContext.stroke();
  };

  createBall(twoDimensionRenderingContext, ball) {
    twoDimensionRenderingContext.beginPath();
    twoDimensionRenderingContext.arc(ball.location.x, ball.location.y, ball.radius, 0, 2 * Math.PI);
    twoDimensionRenderingContext.fillStyle = getComputedStyle(this.element).getPropertyValue('--ball-color');
    twoDimensionRenderingContext.fill();
  };

  createScoreBoard(twoDimensionRenderingContext, game) {
    const scoreLimit = game.score.limit;
    const fontSize = 24;
    twoDimensionRenderingContext.font = `${fontSize}px Courier New`;
    twoDimensionRenderingContext.fillText(`${game.score.computer} / ${scoreLimit}`, 20, (this.element.height / 2) - 20);
    twoDimensionRenderingContext.fillText(`${game.score.player} / ${scoreLimit}`, 20, (this.element.height / 2 + (20 + fontSize)));
  };

  setInfo() {
    // Set up arena left position in the screen
    this.position.left = Math.round(this.element.getBoundingClientRect().left);
  };

  render(paddles, ball, game) {
    // Set info 
    this.setInfo();

    // Create arena background, center line, ball, score board, and paddles
    const twoDimensionRenderingContext = this.element.getContext('2d');

    this.createArenaBackground(twoDimensionRenderingContext);
    this.createCenterLine(twoDimensionRenderingContext);
    this.createBall(twoDimensionRenderingContext, ball);
    this.createScoreBoard(twoDimensionRenderingContext, game);
    paddles.forEach(paddle => {
      this.createPaddle(twoDimensionRenderingContext, paddle);
    });
  };
}

export default Arena;