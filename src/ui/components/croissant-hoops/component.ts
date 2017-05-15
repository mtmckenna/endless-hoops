import Component, { tracked } from '@glimmer/component';
import { Game } from '../../../utils/game/game';
import { Dimensions } from '../../../utils/game/interfaces';

export default class CroissantShot extends Component {

  @tracked
  dimensions : Dimensions = {
    height: 568,
    width:  320
  };

  @tracked
  score: number = 0;

  private game: Game;

  didInsertElement() {
    let screenDimensions: Dimensions = { width: window.innerWidth, height: window.innerHeight };
    this.updateDimensions(screenDimensions);
    this.canvas.width = this.dimensions.width;
    this.game = new Game(this.context, this.dimensions);
    this.game.scoreCallback = (newScore) => { this.scoreCallback(newScore); };
    this.game.gameLoop();
    window.addEventListener('resize', (event) => { this.handleResizeEvent(event); });
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

  handleResizeEvent(event) {
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
