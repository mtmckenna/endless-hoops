import { Ball } from './ball';
import { InputSampler } from './input-sampler';
import { Dimensions, InputSample, Vector2D } from './interfaces';

const INITIAL_BALL_OFFSET: Vector2D = { x: 50, y: 100 };
const ARC_DASH_LENGTH = 5;
const ARC_DASH_SPACE_LENGTH = 15;
const ARC_DASH_ARRAY = [ARC_DASH_LENGTH, ARC_DASH_SPACE_LENGTH];

export class Game {
   constructor(private context: CanvasRenderingContext2D, private dimensions: Dimensions) {
    this.inputSampler = new InputSampler();
    this.addNewBallToGame();
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

  private get newBall(): Ball {
    let ball: Ball = new Ball(this.dimensions, this.context);
    ball.position = {
      x: INITIAL_BALL_OFFSET.x,
      y: this.dimensions.height - INITIAL_BALL_OFFSET.y
    };

    return ball;
  }

  private updateAndDraw() {
    this.clearCanvas();
    let newInput: InputSample = this.inputSampler.sample();
    this.launchBall(newInput);
    this.drawArc(newInput);

    this.balls.forEach((ball) => {
      ball.update();
      ball.draw();
    });

    this.input = newInput;
  }

  private drawArc(newInput: InputSample) {
    if (!newInput.touching) { return; }
    let coordinates = newInput.relativeCoordinates;

    this.context.beginPath();

    let ghostBall = this.newBall;
    this.context.moveTo(ghostBall.position.x, ghostBall.position.y);
    this.context.setLineDash(ARC_DASH_ARRAY);

    ghostBall.launch(coordinates);
    ghostBall.update();

    while (ghostBall.velocity.y < 0) {
      this.context.lineTo(ghostBall.position.x,
                          ghostBall.position.y);
      ghostBall.update();
    }

    this.context.stroke();
  }

  private launchBall(newInput: InputSample) {
    if (this.input.touching && !newInput.touching) {
      let coordinates = newInput.relativeCoordinates;
      this.unlaunchedBall.launch(coordinates);
      this.addNewBallToGame();
    }
  }

  private addNewBallToGame() {
    let ball: Ball = this.newBall;
    this.balls.push(ball);
  }

  private clearCanvas() {
    let width = this.dimensions.width;
    let height = this.dimensions.height;
    this.context.clearRect(0, 0, width, height);
  }
}
