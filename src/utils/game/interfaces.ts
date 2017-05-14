export interface Vector2D {
  x: number;
  y: number;
}

export interface Dimensions {
  width: number;
  height: number;
}

// "touching" means both touching and mousedown
export interface InputSample {
  touching: boolean,
  relativeCoordinates: {
    x: number,
    y: number
  }
}
