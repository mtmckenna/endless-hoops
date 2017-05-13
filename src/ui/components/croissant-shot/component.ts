import Component from '@glimmer/component';
import { Game } from '../../../utils/game/game';

export default class CroissantShot extends Component {
  private score: number = 0;
  private game: Game;

  draw() {
    this.context.moveTo(0,0);
    this.context.lineTo(200,100);
    this.context.stroke();
  }

  didInsertElement() {
    this.draw();
    this.game = new Game(this.context);
    this.game.gameLoop();
  }

  private get canvas() {
    return document.getElementById('game-canvas') as HTMLCanvasElement;
  }

  private get context() {
    return this.canvas.getContext('2d');
  }
}
