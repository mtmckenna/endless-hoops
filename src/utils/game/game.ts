import { Ball } from './ball';

export class Game {
  private ball: Ball;

  constructor(private context: CanvasRenderingContext2D) {
    this.fillBackground();
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

  private get dimensions() {
    return {
      width: this.context.canvas.clientWidth,
      height: this.context.canvas.clientHeight
    };
  }

  private fillBackground() {
    this.context.beginPath();
    this.context.rect(0,
                      0,
                      this.dimensions.width,
                      this.dimensions.height);
    this.context.fillStyle = '#c4ebff';
    this.context.fill();
  }
}
