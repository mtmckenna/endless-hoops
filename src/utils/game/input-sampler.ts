import { InputSample, Vector2D } from './interfaces';

const EVENTS_ARRAY = [
  'mousedown', 'mouseup', 'mousemove',
  'touchstart', 'touchend', 'touchmove'
];

const EVENTS_CALLBACK_MAP = {
  'mousedown': 'down',
  'touchstart': 'down',
  'mouseup': 'up',
  'touchend': 'up',
  'mousemove': 'move',
  'touchmove': 'move',
}

export class InputSampler {
  public static defaultInput: InputSample = {
    touching: false,
    relativeCoordinates: { x: 0, y: 0 }
  };

  constructor() {
    this.addEventListeners();
  }

  sample(): InputSample {
    return {
      touching: this.touching || false,
      relativeCoordinates: this.relativeCoordinates || { x: 0, y: 0 }
    }
  }

  private touching: boolean = false;
  private startCoordinates: Vector2D = { x: 0, y: 0 };
  private relativeCoordinates: Vector2D = { x: 0, y: 0 };

  private addEventListeners() {
    EVENTS_ARRAY.forEach((eventName) => {
      let callback = this[EVENTS_CALLBACK_MAP[eventName]].bind(this);
      window.addEventListener(eventName, callback);
    });
  }

  private coordinatesFromEvent(event): Vector2D {
    // pageX/pageY are on the event when using the mouse
    // and on the 'touches' array when using touch input
    let touch = event;
    if (event.touches) { touch = event.touches[0]; }

    let { pageX: x, pageY: y } = touch;
    let coordinates: Vector2D = { x, y };

    return coordinates;
  }

  private down(event) {
    this.touching = true;
    this.startCoordinates = this.coordinatesFromEvent(event);
  }

  private up(event) {
    this.touching = false;
  }

  private move(event) {
    // Disable iOS bounce-scroll thing
    event.preventDefault();
    if (!this.touching) { return; }

    let currentCoordinates = this.coordinatesFromEvent(event);

    let newRelativeCoordinates: Vector2D = {
      x: currentCoordinates['x'] - this.startCoordinates['x'],
      y: this.startCoordinates['y'] - currentCoordinates['y'],
    };

    this.relativeCoordinates = newRelativeCoordinates;
  }
}
