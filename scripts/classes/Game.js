class Game {
  score = {
    player: 0,
    computer: 0,
    limit: 7,
  };

  isOver = true;

  constructor(arena, ball, computerPaddle, playerPaddle, winAudioEl, loseAudioEl, startAudioEl) {
    this.arena = arena;
    this.ball = ball;
    this.computerPaddle = computerPaddle;
    this.playerPaddle = playerPaddle;
    this.winAudioEl = winAudioEl;
    this.loseAudioEl = loseAudioEl;
    this.startAudioEl = startAudioEl;
  };

  showStartGameUI(winner) {
    // Hide arena
    this.arena.element.hidden = true;

    // Add game over UI
    const startGameEl = document.createElement('div');
    // Container
    startGameEl.classList.add('game__start-game');
    // Title
    const titleEl = document.createElement('h1');

    if (winner) {
      titleEl.textContent = `${winner} Wins!`;
    } else {
      titleEl.textContent = 'Pong!'
    }

    // Button
    const playGameBtn = document.createElement('button');

    if (winner) {
      playGameBtn.textContent = 'Play Again';
    } else {
      playGameBtn.textContent = 'Start Game';
    }

    playGameBtn.addEventListener('click', () => {
      this.restart();
      this.hideStartGameUI();
      // Play audio
      this.startAudioEl.play();
      this.start();
    });
    playGameBtn.classList.add('button');
    // Append
    startGameEl.append(titleEl, playGameBtn);
    this.arena.element.parentElement.appendChild(startGameEl);
  };

  hideStartGameUI() {
    // Show arena
    this.arena.element.hidden = false;

    // Hide game over UI
    const startGameEl = document.querySelector('.game__start-game');
    startGameEl.remove();
  };

  playGameIsOverSound() {
    if (this.score.player === this.score.limit) {
      this.winAudioEl.play();
    }

    if (this.score.computer === this.score.limit) {
      this.loseAudioEl.play();
    }
  };

  checkScore() {
    // Check if any player or computer score reach score limit
    if (this.score.player === this.score.limit || this.score.computer === this.score.limit) {
      this.isOver = true;

      // Show game over UI
      const winner = this.score.player === this.score.limit ? 'Player 1' : 'Computer';
      this.showStartGameUI(winner);
      this.playGameIsOverSound();
    }
  };

  animate() {
    // Check if the game is over
    this.checkScore();

    // Render arena, move ball and computer paddle
    this.arena.render([this.computerPaddle, this.playerPaddle], this.ball, this);
    this.ball.move(this, this.arena.size, this.computerPaddle, this.playerPaddle);
    this.computerPaddle.move(this.ball.location.x, this.arena.size.width, this.ball.speed.x);

    // Animate arena, ball, and computer paddle
    if (!this.isOver) {
      window.requestAnimationFrame(this.animate.bind(this));
    }

  };

  restart() {
    // Reset game status
    this.isOver = false;
    this.score.player = 0;
    this.score.computer = 0;

    // Put ball in the center
    this.ball.reset(this.arena.size);
  };

  start() {
    // Restart game
    if (this.isOver) {
      this.showStartGameUI();
    } else {
      // Start animation
      this.animate();

      // Listen to player mouse move
      this.arena.element.addEventListener('mousemove', (e) => {
        /*
          Move player paddle

          - "e.clientX" is the cursor x position in the screen coordinate
          - "this.arena.position.left" is the arena x axis parallel line position in the screen coordinate
        */
        this.playerPaddle.move(e.clientX - this.arena.position.left, this.arena.size.width);

        // Hide Cursor
        this.arena.element.style.cursor = 'none';
      });
    }

  };
}

export default Game;