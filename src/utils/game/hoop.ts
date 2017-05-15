import { Sprite } from './sprite';
import { Game } from './game';
import { Dimensions, Rectangle } from './interfaces';
import { getRandomFloat } from '../util';

const RIM_HEIGHT = 2;
const TOP_MARGIN = 75;

export class Hoop extends Sprite {
  protected base64EncodedImage: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAQCAYAAADwMZRfAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAA6ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxNy0wNS0xNFQxODowNTo0MDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+UGl4ZWxtYXRvciAzLjY8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6Q29tcHJlc3Npb24+NTwvdGlmZjpDb21wcmVzc2lvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+NzI8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjcyPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MTc8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPjE8L2V4aWY6Q29sb3JTcGFjZT4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjE2PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+ClAGMJ4AAABVSURBVDgRY/y5Vvs/A4WAiUL9CO3/gQDEI5emikuoYgjcT+R6BWQAdV0CMhHmmn/QgCZEg/SgAJgBpNIgQ0a9gxKUmBxCsYEuj2ECugJi+RQbBDMAADIY8dFSvZS9AAAAAElFTkSuQmCC';

  constructor(worldDimensions: Dimensions,
              context?: CanvasRenderingContext2D) {
    super(worldDimensions, context);

    let maxX = worldDimensions.width - this.dimensions.width;
    let maxY = worldDimensions.height - this.dimensions.height - Game.INITIAL_BALL_OFFSET.y;

    this.position = {
      x: getRandomFloat(Game.INITIAL_BALL_OFFSET.x, maxX),
      y: getRandomFloat(TOP_MARGIN, maxY)
    };
  }

  protected get hitBox(): Rectangle {
    return {
      left: this.position.x,
      right: this.position.x + this.dimensions.width,
      top: this.position.y,
      bottom: this.position.y + RIM_HEIGHT
    };
  }
}
