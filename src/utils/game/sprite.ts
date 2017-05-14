// Why does this file have to be under utils? v
// https://github.com/glimmerjs/resolution-map-builder/issues/8

import { Vector2D, Dimensions } from './interfaces';

export abstract class Sprite {
  public position: Vector2D = { x: 0, y: 0 };
  public velocity: Vector2D = { x: 0, y: 0 };

  protected abstract base64EncodedImage: string;
  protected rotation: number = 0.0;
  protected rotationSpeed: number = 0.0;
  protected get dimensions() {
    return { width: this.image.width, height: this.image.height };
  }

  constructor(protected worldDimensions: Dimensions,
              private context?: CanvasRenderingContext2D) {}

  intersects(anotherSprite) {
    let r1: Rectangle = {
      left: this.position.x,
      right: this.position.x + this.dimensions.width,
      top: this.position.y,
      bottom: this.position.y + this.dimensions.height
    }

    let r2: Rectangle = {
      left: anotherSprite.position.x,
      right: anotherSprite.position.x + anotherSprite.dimensions.width,
      top: anotherSprite.position.y,
      bottom: anotherSprite.position.y + anotherSprite.dimensions.height
    };

    return !(r2.left > r1.right ||
             r2.right < r1.left ||
             r2.top > r1.bottom ||
             r2.bottom < r1.top);
  }

  update() {
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

  private _image;
  private get image() {
    if (this._image) { return this._image; }
    this._image = new Image();
    this._image.src = this.base64EncodedImage;
    return this._image;
  }
}

interface Rectangle {
  left: number;
  right: number;
  top: number;
  bottom: number;
}
