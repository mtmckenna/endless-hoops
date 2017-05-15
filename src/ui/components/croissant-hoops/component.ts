import Component from '@glimmer/component';
import { Game } from '../../../utils/game/game';
import { Dimensions } from '../../../utils/game/interfaces';

export default class CroissantShot extends Component {
  dimensions : Dimensions = {
    height: 568,
    width:  320
  };

  private score: number = 0;
  private game: Game;

  didInsertElement() {
    this.game = new Game(this.context, this.dimensions);
    this.game.gameLoop();
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
