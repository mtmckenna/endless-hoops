import Component from "@glimmer/component";

export default class CroissantShot extends Component {
  score = 0;

  get canvas() {
    return document.getElementById('game-canvas');
  }

  get context() {
    return this.canvas.getContext('2d');
  }

  draw() {
    this.context.moveTo(0,0);
    this.context.lineTo(200,100);
    this.context.stroke();
  }

  didInsertElement() {
    this.draw();
  }
}
