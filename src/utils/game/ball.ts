import { Sprite } from './sprite';
import { Vector2D } from './interfaces';

const AXIS_TO_DIMENSION_MAP = {
  'x': 'width',
  'y': 'height'
};

const MAX_VELOCITY = 30.0;
const MIN_VELOCITY = 3.0;
const MIN_ROTATION = 0.1;

export class Ball extends Sprite {
  launched: boolean = false;

  protected base64EncodedImage: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAABxpRE9UAAAAAgAAAAAAAAAIAAAAKAAAAAgAAAAIAAAAkKa6ghYAAABcSURBVDgRpI1hCkAhCIO9T2fvgP3qtcpaw+BBgTjn/DILXsmpotqq96mDpFh+6J0B5MnVHtdvFA69fTLV7aCtDwDPB8QB6AjdSnKDwaZqgNTjuRPYUP0LgNBD2QcAAP//nwulkAAAAFlJREFUY/i5Vvs/LszAwIBTDqQHKM/AgEszVAFhA9ANAfJBJmPFyJaB9MEBTAIogGIjPj5cMxIDRTMuL4AMRdKDyoS5BEaDFMPYMBpVBw4ekmK4ATiUUi4MAIcSmN9RakHzAAAAAElFTkSuQmCC';

  update() {
    if (this.subjectToGravity) { this.applyPhysics(); }
    super.update();
  }

  launch(coordinates: Vector2D) {
    this.launched = true;
    this.velocity.x = this.velocityForCoordinate(coordinates.x, 'width');
    this.velocity.y = -this.velocityForCoordinate(coordinates.y, 'height');
    this.rotationSpeed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
  }

  private gravity: number = 1.0;
  private friction: number = 0.75;
  private dead: boolean = false;

  private get subjectToGravity(): boolean {
    return this.launched && !this.dead;
  }

  private get yPositionAtGround(): number {
    return this.worldDimensions.height - this.dimensions.height;
  }

  // Keep the velocity between -MAX_VEL and MAX_VEL
  private velocityForCoordinate(coordinate, dimension): number {
    return MAX_VELOCITY * coordinate / this.worldDimensions[dimension];
  }

  private applyPhysics() {
    this.handleCollisions();
    this.applyGravity();
    if (this.velocity.x === 0 && this.velocity.y === 0) {
      this.rotationSpeed = 0.0;
    }
  }

  private applyGravity() {
    if (this.position.y < this.yPositionAtGround) {
      this.velocity.y += this.gravity;
    }
  }

  private handleCollisions() {
    ['x', 'y'].forEach((axis) => {
      let bounce = this.limitPositionToWorldBounds(axis);

      if (bounce) {
        this.velocity[axis] = -this.velocity[axis] * this.friction;
        this.slowRotationAfterBounce(axis);
        this.stopIfMovingTooSlow(axis);
      }
    });
  }

  private slowRotationAfterBounce(axis) {
    this.rotationSpeed *= this.friction;
    if (axis === 'x') { this.rotationSpeed *= -1 }
  }

  private stopIfMovingTooSlow(axis) {
    if (this.movingTooSlow(this.velocity[axis])) {
      this.velocity[axis] = 0.0;
    }
  }

  private movingTooSlow(speed) {
    return speed > -MIN_VELOCITY && speed < MIN_VELOCITY;
  }

  // The 0, 0 point is in the top left corner of the screen
  private limitPositionToWorldBounds(axis): boolean {
    let leaving: boolean = false;

    let dimension: number = AXIS_TO_DIMENSION_MAP[axis];
    let imageDimension: number = this.dimensions[dimension];
    let maxPosition: number = this.worldDimensions[dimension] - imageDimension;
    let currentPosition: number = this.position[axis];

    if (currentPosition > maxPosition) {
      leaving = true;
      currentPosition = maxPosition;
    }

    if (currentPosition < imageDimension) {
      leaving = true;
      currentPosition = imageDimension;
    }

    this.position[axis] = currentPosition;

    return leaving;
  }
}
