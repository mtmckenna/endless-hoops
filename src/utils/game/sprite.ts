// Why does this file have to be under utils? v
// https://github.com/glimmerjs/resolution-map-builder/issues/8

import { Vector2D, Dimensions, Rectangle } from './interfaces';

const AXIS_TO_RECTANGLE_MAP = {
  x: { min: 'left', max: 'right' },
  y: { min: 'top', max: 'bottom' }
};

export abstract class Sprite {
  public position: Vector2D = { x: 0, y: 0 };
  public velocity: Vector2D = { x: 0, y: 0 };
  public context: CanvasRenderingContext2D;

  get hitBox(): Rectangle {
    return {
      left: this.position.x,
      right: this.position.x + this.dimensions.width,
      top: this.position.y,
      bottom: this.position.y + this.dimensions.height
    };
  }

  protected abstract base64EncodedImage: string;
  protected rotation: number = 0.0;
  protected rotationSpeed: number = 0.0;
  protected worldDimensions: Dimensions;

  protected get dimensions() {
    return { width: this.image.width, height: this.image.height };
  }

  constructor(worldDimensions: Dimensions, context?: CanvasRenderingContext2D) {
    this.worldDimensions = worldDimensions;
    this.context = context;
  }

  intersects(anotherSprite) {
    let r1: Rectangle = this.hitBox;
    let r2: Rectangle = anotherSprite.hitBox;
    let xOverlap: boolean = this.axisOverlaps(r1, r2, 'x');
    let yOverlap: boolean = this.axisOverlaps(r1, r2, 'y');

    return xOverlap && yOverlap;
  }

  update() {
    this.oldHitBox = this.hitBox;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.rotation += this.rotationSpeed;
  }

  draw() {
    const x = this.position.x;
    const y = this.position.y;

    this.context.save();

    this.context.translate(x, y);
    this.context.rotate(this.rotation);
    this.context.drawImage(this.image,
                           -this.dimensions.width / 2.0,
                           -this.dimensions.height / 2.0);

    this.context.restore();
  }

  private oldHitBox: Rectangle = { left: 0, right: 0, top: 0, bottom: 0 };
  private _image;

  private get image() {
    if (this._image) { return this._image; }
    this._image = new Image();
    this._image.src = this.base64EncodedImage;
    return this._image;
  }

  private axisOverlaps(r1, r2, axis) {
    let maxKey = AXIS_TO_RECTANGLE_MAP[axis]['max'];
    let minKey = AXIS_TO_RECTANGLE_MAP[axis]['min'];
    let r1Max: number = r1[maxKey];
    let r1Min: number = r1[minKey];
    let r2Max: number = r2[maxKey];
    let r2Min: number = r2[minKey];

    return r2Min <= r1Max && r1Min <= r2Max;
  }
}

