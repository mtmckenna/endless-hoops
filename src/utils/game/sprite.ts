// Why does this file have to be under utils? v
// https://github.com/glimmerjs/resolution-map-builder/issues/8

export abstract class Sprite {
  protected abstract base64EncodedImage: string;
  private vel: Vector2D = { x: 0, y: 0 };
  private pos: Vector2D = { x: 0, y: 0 };
  private _image;

  constructor(private context: CanvasRenderingContext2D) {}

  intersects(anotherSprite) {
    let r1: Rectangle = {
      left: this.pos.x,
      right: this.pos.x + this.dimensions.width,
      top: this.pos.y,
      bottom: this.pos.y + this.dimensions.height
    }

    let r2: Rectangle = {
      left: anotherSprite.pos.x,
      right: anotherSprite.pos.x + anotherSprite.dimensions.width,
      top: anotherSprite.pos.y,
      bottom: anotherSprite.pos.y + anotherSprite.dimensions.height
    };

    return !(r2.left > r1.right ||
             r2.right < r1.left ||
             r2.top > r1.bottom ||
             r2.bottom < r1.top);
  }

  update() {
    this.pos.x = this.pos.x + this.vel.x;
    this.pos.y = this.pos.y + this.vel.y;
  }

  draw() {
    const x = this.pos.x;
    const y = this.pos.y;
    this.context.drawImage(this.image, x, y);
  }

  private get image() {
    if (this._image) { return this._image; }
    this._image = new Image();
    this._image.src = this.base64EncodedImage;
    return this._image;
  }

  private get dimensions() {
    return { width: this.image.width, height: this.image.height };
  }
}

interface Rectangle {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

interface Vector2D {
  x: number;
  y: number;
}

interface Dimensions {
  width: number;
  height: number;
}
