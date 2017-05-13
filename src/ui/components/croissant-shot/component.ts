import Component from '@glimmer/component';
import { Game } from '../../../utils/game/game';

export default class CroissantShot extends Component {
  private score: number = 0;
  private game: Game;

  didInsertElement() {
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
