import { generatePositiveOrNegativeNum } from "../utils.js";

class Ball {
  location = {
    x: undefined,
    y: undefined,
  };

  speed = {
    x: 0, // Between 0 and 5
    y: 3, // Always increase
  };

  direction = {
    x: 0,
    y: generatePositiveOrNegativeNum(3), // Random choice where the ball goes to at first
  }

  radius = 5;

  /* 
    Assigned when instantiated
  */
  bounceBoundary = {
    top: undefined,
    bottom: undefined,
    left: undefined,
    right: undefined,
  };

  constructor(arenaSize, paddleTopTip, paddleBottomTip, bounceAudioEl, goalAudioEl) {
    this.putInTheMiddle(arenaSize);
    this.bounceBoundary.top = paddleTopTip + this.radius;
    this.bounceBoundary.bottom = paddleBottomTip - this.radius;
    this.bounceBoundary.right = arenaSize.width - this.radius;
    this.bounceBoundary.left = 0 + this.radius;
    this.bounceAudioEl = bounceAudioEl;
    this.goalAudioEl = goalAudioEl;
  };

  calculateMiddleLocation(arenaSideSize) {
    return arenaSideSize / 2;
  };

  putInTheMiddle(arenaSize) {
    this.location.x = this.calculateMiddleLocation(arenaSize.width);
    this.location.y = this.calculateMiddleLocation(arenaSize.height);
  };

  playBounceSound() {
    this.bounceAudioEl.play();
  };

  playGoalSound() {
    this.goalAudioEl.play();
  };

  checkWallBounce() {
    // If the ball hits the wall
    if ((this.location.x - this.radius) <= this.bounceBoundary.left ||
      (this.location.x + this.radius) >= this.bounceBoundary.right) {
      // Bounce the left wall
      if ((this.location.x - this.radius) <= this.bounceBoundary.left) {
        this.direction.x = this.speed.x;
      }

      // Bounce the right wall
      if ((this.location.x + this.radius) >= this.bounceBoundary.right) {
        this.direction.x = -this.speed.x;
      }

      this.playBounceSound();
    }

  };

  checkPaddleBounce(game, arenaSize, topPaddle, bottomPaddle) {
    /*
      Bounce Bottom Paddle

      - "(this.location.y + this.radius) >= this.bounceBoundary.bottom" is to check 
        if the ball y location is bigger or equal than bottom paddle tip, 
        if so calculate whether the ball x position less than paddle bottom x position 
        (in the upper left corner) or more than paddle size 
        (paddle bottom x position + paddle bottom width)
    */
    if ((this.location.y + this.radius) >= this.bounceBoundary.bottom) {
      /*
        Calculate if the ball x position hits paddle bottom

        - "bottomPaddle.location.x <= this.location.x 
          && this.location.x <= (bottomPaddle.location.x + bottomPaddle.size.width)" 
          is to calculate whether the ball is in paddle range
      */
      if (bottomPaddle.location.x <= this.location.x &&
        this.location.x <= (bottomPaddle.location.x + bottomPaddle.size.width)) {
        // Play bounce sounds
        this.playBounceSound();

        // Increase y speed
        this.speed.y += 2;
        // Generate random x speed between 1 and 5
        this.speed.x = Math.floor((Math.random() * 6) + 1);
        // Change ball vertical direction to go up (decreasing the number)
        this.direction.y = -this.speed.y;

        /*
          Change ball horizontal direction

          - If the ball hit the left side of the paddle, bounce the ball to the left
          - If the ball hit the right side of the paddle, bounce the ball to the right
          - If the ball hit the center of the paddle, random bounce the ball to the right or left
        */
        if (this.location.x < (bottomPaddle.location.x + (bottomPaddle.size.width / 2))) {
          // Bounce to left
          this.direction.x = -this.speed.x;
        } else if (this.location.x > (bottomPaddle.location.x + (bottomPaddle.size.width / 2))) {
          // Bounce to right
          this.direction.x = this.speed.x;
        } else {
          // Random bounce to left or right
          this.direction.x = generatePositiveOrNegativeNum(this.speed.x);
        }
      }

      // Check if paddle bottom did not hit the ball
      if ((this.location.y + this.radius) > arenaSize.height) {
        this.playGoalSound();
        this.reset(arenaSize);
        game.score.computer++;
      }
    }

    /*
      Bounce Top Paddle

      - "(this.location.y - this.radius) <= this.bounceBoundary.top" is to check if 
        the ball y location is less or equal than top paddle tip, 
        if so calculate whether the ball x position less than paddle top x position 
        (in the upper left corner) or more than paddle size 
        (paddle top x position + paddle top width)
    */
    if ((this.location.y - this.radius) <= this.bounceBoundary.top) {
      /*
        Calculate if the ball x position hits paddle top

        - "topPaddle.location.x <= this.location.x && this.location.x <= 
          (topPaddle.location.x + topPaddle.size.width)" is to calculate whether 
          the ball is in paddle range
      */
      if (topPaddle.location.x <= this.location.x &&
        this.location.x <= (topPaddle.location.x + topPaddle.size.width)) {
        // Play ball bounce sounds
        this.playBounceSound();

        // Increase speed y
        this.speed.y += 2;
        // Generate speed x between 1 and 5
        this.speed.x = Math.floor((Math.random() * 6) + 1);

        // Change ball vertical direction from up to down (increasing the number)
        this.direction.y = this.speed.y;

        /*
          Change ball horizontal direction

          - If the ball hit the left side of the paddle, bounce the ball to the left
          - If the ball hit the right side of the paddle, bounce the ball to the right
          - If the ball hit the center of the paddle, random bounce the ball to the right or left
        */
        if (this.location.x < (topPaddle.location.x + (topPaddle.size.width / 2))) {
          // Bounce to left
          this.direction.x = -this.speed.x;
        } else if ((this.location.x > (topPaddle.location.x + (topPaddle.size.width / 2)))) {
          // Bounce to right
          this.direction.x = this.speed.x;
        } else {
          // Random bounce to left or right
          this.direction.x = generatePositiveOrNegativeNum(this.speed.x);
        }
      }

      /*
        Check if paddle top did not hit the ball
      */
      if ((this.location.y - this.radius) < 0) {
        this.playGoalSound();
        this.reset(arenaSize);
        game.score.player++;
      }
    }
  };

  move(game, arenaSize, topPaddle, bottomPaddle) {
    // Change ball x,y location
    this.location.y += this.direction.y;
    this.location.x += this.direction.x;

    // Check potential bounce from wall and paddles
    this.checkWallBounce();
    this.checkPaddleBounce(game, arenaSize, topPaddle, bottomPaddle);
  };

  reset(arenaSize) {
    this.speed.y = 3;
    this.speed.x = 0;
    this.direction.x = 0;

    // Goes to the last player who conceded a goal
    if (this.direction.y > 1) {
      this.direction.y = 3;
    } else {
      this.direction.y = -3;
    }
    this.putInTheMiddle(arenaSize);
  };
}

export default Ball;