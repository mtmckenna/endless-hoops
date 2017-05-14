import { Ball } from './ball';
import { InputSampler } from './input-sampler';
import { Dimensions, InputSample, Vector2D } from './interfaces';

const INITIAL_BALL_OFFSET: Vector2D = { x: 50, y: 100 };

export class Game {
   constructor(private context: CanvasRenderingContext2D, private dimensions: Dimensions) {
    this.inputSampler = new InputSampler();
    this.addNewBall();
  }

  updateAndDraw() {
    this.clearCanvas();
    let newInput: InputSample = this.inputSampler.sample();
    this.launchBall(newInput);

    this.balls.forEach((ball) => {
      ball.update();
      ball.draw();
    });

    this.input = newInput;
  }

  gameLoop() {
    window.requestAnimationFrame(() => { this.gameLoop(); });
    this.updateAndDraw();
  }

  private ball: Ball;
  private balls: Array<Ball> = [];
  private inputSampler: InputSampler;
  private input: InputSample = InputSampler.defaultInput;

  private get unlaunchedBall() {
    let ball = this.balls[this.balls.length - 1];

    if (ball.launched) {
      return null;
    }

    return ball;
  }

  private launchBall(newInput: InputSample) {
    if (this.input.touching && !newInput.touching) {
      let coordinates = newInput.relativeCoordinates;
      this.unlaunchedBall.launch(coordinates);
      this.addNewBall();
    }
  }

  private addNewBall() {
    let ball: Ball = new Ball(this.context, this.dimensions);
    ball.position = {
      x: INITIAL_BALL_OFFSET.x,
      y: this.dimensions.height - INITIAL_BALL_OFFSET.y
    };

    this.balls.push(ball);
  }

  private clearCanvas() {
    let width = this.dimensions.width;
    let height = this.dimensions.height;
    this.context.clearRect(0, 0, width, height);
  }
}
