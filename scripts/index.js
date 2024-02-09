import Arena from "./classes/Arena.js";
import Ball from "./classes/Ball.js";
import Game from "./classes/Game.js";
import Paddle, { paddleVerticalLocation } from "./classes/Paddle.js";
import ComputerPaddle from "./classes/ComputerPaddle.js";

const arena = new Arena(document.getElementById('arena'));
// Top paddle is computer
const computerPaddle = new ComputerPaddle(arena.size, paddleVerticalLocation.top);
// Bottom paddle is player
const playerPaddle = new Paddle(arena.size, paddleVerticalLocation.bottom);
const ball = new Ball(
  arena.size,
  computerPaddle.location.paddleTip,
  playerPaddle.location.paddleTip,
  document.getElementById('ball_bounce_audio'),
  document.getElementById('goal_audio'),
);
const game = new Game(
  arena,
  ball,
  computerPaddle,
  playerPaddle,
  document.getElementById('win_audio'),
  document.getElementById('lose_audio'),
  document.getElementById('start_audio'),
);

window.addEventListener('load', game.start.bind(game));
