import Component, { tracked } from '@glimmer/component';
import { Game } from '../../../utils/game/game';
import { Dimensions } from '../../../utils/game/interfaces';

export default class EndlessHoops extends Component {

  @tracked
  dimensions : Dimensions = {
    height: 568,
    width:  320
  };

  @tracked
  score: number = 0;

  private game: Game;
  private boundResizeEventHandler;

  didInsertElement() {
    let screenDimensions: Dimensions = { width: window.innerWidth, height: window.innerHeight };
    this.updateDimensions(screenDimensions);
    this.canvas.width = this.dimensions.width;
    this.game = new Game(this.context, this.dimensions);
    this.game.scoreCallback = this.scoreCallback.bind(this);
    this.boundResizeEventHandler = this.resizeEventHandler.bind(this);
    this.game.gameLoop();

    window.addEventListener('resize',  this.boundResizeEventHandler);
  }

  willDestroy() {
    window.removeEventListener('resize', this.boundResizeEventHandler);
  }

  scoreCallback(newScore: number) {
    this.score = newScore;
    this.pulseScore();
  }

  pulseScore() {
    let element = document.getElementById('score');
    element.classList.remove('pulse');
    setTimeout(function() {
      element.classList.add('pulse');
    }, 0);
  }

  resizeEventHandler(event) {
    let innerWidth: number = Math.floor(event.target.innerWidth);
    let innerHeight: number = Math.floor(event.target.innerHeight);
    let screenDimensions = { width: innerWidth, height: innerHeight };
    this.updateDimensions(screenDimensions);
    this.game.dimensions = this.dimensions;
  }

  updateDimensions(screenDimensions: Dimensions) {
    let screenWidth = screenDimensions.width;
    let screenHeight = screenDimensions.height;
    let width: number = Math.floor(screenWidth / screenHeight * this.dimensions.height);

    this.dimensions = {
      height: this.dimensions.height,
      width: width
    };
  }

  updateGravity(event) {
    this.game.gravity = parseFloat(event.target.value);
  }

  private get canvas() {
    return document.getElementById('game-canvas') as HTMLCanvasElement;
  }

  private get context() {
    return this.canvas.getContext('2d');
  }
}
