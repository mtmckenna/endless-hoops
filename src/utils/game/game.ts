import { Ball } from './ball';

export class Game {
  private ball: Ball;

  constructor(private context: CanvasRenderingContext2D) {
    this.ball = new Ball(context);
  }

  update() {
    this.ball.update();
  }

  draw () {
    this.ball.draw();
  }

  gameLoop() {
    window.requestAnimationFrame(() => { this.gameLoop(); });
    this.update();
    this.draw();
  }
}
