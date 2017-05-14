import { Ball } from './ball';
import { InputSampler } from './input-sampler';
import { Dimensions, InputSample } from './interfaces';

const INITIAL_BALL_OFFSET: number = 25;

export class Game {
   constructor(private context: CanvasRenderingContext2D, private dimensions: Dimensions) {
    this.ball = new Ball(context, dimensions);
    this.ball.position = {
      x: INITIAL_BALL_OFFSET,
      y: this.dimensions.height - INITIAL_BALL_OFFSET
    };
    this.inputSampler = new InputSampler();
  }

  update() {
    let newInput: InputSample = this.inputSampler.sample();

    this.launchBall(this.ball, newInput);
    this.ball.update();

    this.input = newInput;
  }

  draw () {
    this.clearCanvas();
    this.ball.draw();
  }

  gameLoop() {
    window.requestAnimationFrame(() => { this.gameLoop(); });
    this.update();
    this.draw();
  }

  private ball: Ball;
  private inputSampler: InputSampler;
  private input: InputSample = InputSampler.defaultInput;

  private launchBall(ball: Ball, newInput: InputSample) {
    if (this.input.touching && !newInput.touching) {
      let coordinates = newInput.relativeCoordinates;
      ball.launch(coordinates);
    }
  }

  private clearCanvas() {
    let width = this.dimensions.width;
    let height = this.dimensions.height;
    this.context.clearRect(0, 0, width, height);
  }
}
