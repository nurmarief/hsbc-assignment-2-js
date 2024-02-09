export const paddleVerticalLocation = {
  top: 'top',
  bottom: 'bottom'
};

class Paddle {
  size = {
    height: 10,
    width: 50,
  };

  /* 
    - 0,0 of x,y is on the upper left corner
    - Location is assigned when instantiated
  */
  location = {
    x: undefined,
    y: undefined,
    paddleTip: undefined,
  };

  gap = {
    y: 10,
  };

  isMove = false;

  constructor(arenaSize, verticalLocation) {
    this.location.x = this.calculateHorizontalLocation(arenaSize.width, verticalLocation);
    this.location.y = this.calculateVerticalLocation(arenaSize.height, verticalLocation);
    this.location.paddleTip = this.calculatePaddleTip(verticalLocation);
  };

  calculateHorizontalLocation(arenaWidth) {
    /* 
      Put paddle location a little bit to the left because paddle 0,0 is on the upper left corner, 
      so its center of width located in the middle of the arena 
    */
    return (arenaWidth / 2) - (this.size.width / 2);
  };

  calculateVerticalLocation(arenaHeight, verticalLocation) {
    switch (verticalLocation) {
      case paddleVerticalLocation.top:
        return this.gap.y;
      case paddleVerticalLocation.bottom:
        return arenaHeight - (this.size.height + this.gap.y);
      default:
        break;
    }
  };

  calculatePaddleTip(verticalLocation) {
    switch (verticalLocation) {
      case paddleVerticalLocation.top:
        return this.location.y + this.size.height;
      case paddleVerticalLocation.bottom:
        return this.location.y;
      default:
        break;
    }
  };

  checkHorizontalBoundaries(arenaWidth) {
    // Prevent paddle to not accross boundaries
    // Left
    if (this.location.x <= 0) {
      this.location.x = 0;
    }

    // Right
    if (this.location.x >= (arenaWidth - this.size.width)) {
      this.location.x = (arenaWidth - this.size.width);
    }
  };

  move(paddlePosition, arenaWidth) {
    this.isMove = true;
    this.location.x = paddlePosition;

    this.checkHorizontalBoundaries(arenaWidth);
  }
};

export default Paddle;